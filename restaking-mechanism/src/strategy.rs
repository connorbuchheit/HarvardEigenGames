use ethers::types::{Address, U256};
use reqwest::Client;
use serde::Deserialize;
use std::collections::HashMap;

#[derive(Debug)]
pub struct StakingStrategy {
    client: Client,
    api_key: String,
    base_url: String,
}

#[derive(Deserialize)]
struct ProtocolStats {
    apy: f64,
    tvl: U256,
    risk_score: f64,  // Lower is better
}

#[derive(Debug)]
pub struct AllocationPlan {
    pub lido_percentage: f64,
    pub eigenlayer_percentage: f64,
    pub recommended_amounts: HashMap<String, U256>,
}

impl StakingStrategy {
    pub fn new(api_key: String) -> Self {
        Self {
            client: Client::new(),
            api_key,
            base_url: "https://api.p2p.org".to_string(),
        }
    }

    /// Fetch protocol statistics from P2P API
    async fn get_protocol_stats(&self, protocol: &str) -> Result<ProtocolStats, Box<dyn std::error::Error>> {
        let response = self.client
            .get(format!("{}/api/v1/eth/staking/{}/stats", self.base_url, protocol))
            .header("Authorization", format!("Bearer {}", self.api_key))
            .send()
            .await?
            .json::<ProtocolStats>()
            .await?;

        Ok(response)
    }

    /// Calculate optimal allocation based on APY, TVL, and risk factors
    pub async fn calculate_allocation(&self, total_amount: U256) -> Result<AllocationPlan, Box<dyn std::error::Error>> {
        // Fetch stats for both protocols
        let lido_stats = self.get_protocol_stats("lido").await?;
        let eigen_stats = self.get_protocol_stats("eigenlayer").await?;

        // Calculate allocation scores (simple weighted average of APY and risk)
        let apy_weight = 0.7;
        let risk_weight = 0.3;

        let lido_score = (lido_stats.apy * apy_weight) - (lido_stats.risk_score * risk_weight);
        let eigen_score = (eigen_stats.apy * apy_weight) - (eigen_stats.risk_score * risk_weight);

        let total_score = lido_score + eigen_score;
        
        // Calculate percentages
        let lido_percentage = lido_score / total_score;
        let eigen_percentage = eigen_score / total_score;

        // Calculate actual amounts based on percentages
        let lido_amount = (total_amount * U256::from((lido_percentage * 100.0) as u64)) / U256::from(100);
        let eigen_amount = (total_amount * U256::from((eigen_percentage * 100.0) as u64)) / U256::from(100);

        let mut recommended_amounts = HashMap::new();
        recommended_amounts.insert("lido".to_string(), lido_amount);
        recommended_amounts.insert("eigenlayer".to_string(), eigen_amount);

        Ok(AllocationPlan {
            lido_percentage,
            eigenlayer_percentage,
            recommended_amounts,
        })
    }

    /// Get current market conditions and risks
    pub async fn get_market_analysis(&self) -> Result<String, Box<dyn std::error::Error>> {
        let response = self.client
            .get(format!("{}/api/v1/eth/staking/market/analysis", self.base_url))
            .header("Authorization", format!("Bearer {}", self.api_key))
            .send()
            .await?
            .text()
            .await?;

        Ok(response)
    }
}