use reqwest::Client;
use ethers::types::{Address, U256};
use serde::{Deserialize, Serialize};
use serde_json::json;
use dotenv::dotenv;
use std::env;
use std::error::Error;

/// Struct for restaking request
#[derive(Serialize, Deserialize)]
struct RestakeRequest {
    validator_address: String, // Convert Address to String
    amount: String, // Convert U256 to String
    token: String,
}

/// Struct for response from `create_pod`
#[derive(Serialize, Deserialize, Debug)]
struct CreatePodResponse {
    result: Option<CreatePodResult>,
    error: Option<String>,
}

/// Struct for `create_pod` transaction details
#[derive(Serialize, Deserialize, Debug)]
struct CreatePodResult {
    serializeTx: String,
    to: String,
    gasLimit: String,
    data: String,
    value: String,
    chainId: String,
    #[serde(rename = "type")]
    type_: String,
    maxFeePerGas: String,
    maxPriorityFeePerGas: String,
}

/// Struct to handle P2P restaking API
pub struct P2PRestaker {
    client: Client,
    api_key: String,
    base_url: String,
}

impl P2PRestaker {
    /// Initializes P2PRestaker with API key from `.env`
    pub fn new() -> Self {
        dotenv().ok(); // Load environment variables

        let api_key = env::var("P2P_API_KEY").expect("Missing P2P_API_KEY in .env");

        Self {
            client: Client::new(),
            api_key,
            base_url: "https://api-test-holesky.p2p.org".to_string(), // Use testnet URL
        }
    }

    /// Create an EigenPod
    pub async fn create_eigenpod(&self) -> Result<CreatePodResponse, String> {
        let response = self.client
            .post(format!("{}/api/v1/eth/staking/eigenlayer/tx/create-pod", self.base_url))
            .header("Authorization", format!("Bearer {}", self.api_key))
            .header("Content-Type", "application/json")
            .send()
            .await
            .map_err(|e| format!("HTTP Request Failed: {}", e))?;

        let pod_response = response.json::<CreatePodResponse>().await
            .map_err(|e| format!("Failed to parse JSON response: {}", e))?;

        if response.status().is_success() {
            println!("EigenPod Created: {:?}", pod_response);
            Ok(pod_response)
        } else {
            Err(format!("Failed to create EigenPod: {:?}", pod_response.error))
        }
    }

    /// Restake funds using the P2P API
    pub async fn restake(&self, validator: Address, amount: U256, token: String) -> Result<(), String> {
        let request = RestakeRequest {
            validator_address: format!("{:?}", validator), // Convert Address to String
            amount: amount.to_string(), // Convert U256 to String
            token,
        };

        let response = self.client
            .post(format!("{}/api/v1/eth/staking/restake", self.base_url))
            .header("Authorization", format!("Bearer {}", self.api_key))
            .json(&request)
            .send()
            .await
            .map_err(|e| format!("HTTP Request Failed: {}", e))?;

        if response.status().is_success() {
            println!("Successfully restaked.");
            Ok(())
        } else {
            Err(format!("Failed to restake: {:?}", response.text().await))
        }
    }

    /// Fetch the balance of a validator
    pub async fn get_balance(&self, validator: Address) -> Result<U256, String> {
        let response = self.client
            .get(format!("{}/api/v1/eth/staking/balance/{}", self.base_url, validator))
            .header("Authorization", format!("Bearer {}", self.api_key))
            .send()
            .await
            .map_err(|e| format!("HTTP Request Failed: {}", e))?;

        if response.status().is_success() {
            let json: serde_json::Value = response.json().await.map_err(|e| e.to_string())?;
            let balance_str = json["balance"].as_str().ok_or("Invalid balance response")?;
            let balance = balance_str.parse::<U256>().map_err(|e| e.to_string())?;
            println!("Validator Balance: {:?}", balance);
            Ok(balance)
        } else {
            Err(format!("Failed to get balance: {:?}", response.text().await))
        }
    }

    /// Unstake ETH from EigenLayer
    pub async fn unstake(&self, validator: Address, amount: U256) -> Result<(), String> {
        let response = self.client
            .post(format!("{}/api/v1/eth/staking/unstake", self.base_url))
            .header("Authorization", format!("Bearer {}", self.api_key))
            .json(&json!({
                "validator_address": format!("{:?}", validator),
                "amount": amount.to_string(),
            }))
            .send()
            .await
            .map_err(|e| format!("HTTP Request Failed: {}", e))?;

        if response.status().is_success() {
            println!("Successfully unstaked.");
            Ok(())
        } else {
            Err(format!("ailed to unstake: {:?}", response.text().await))
        }
    }
}
