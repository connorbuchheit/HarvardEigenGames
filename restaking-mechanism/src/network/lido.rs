use async_trait::async_trait;
use ethers::{
    prelude::*,
    types::{Address, U256},
};
use dotenv::dotenv;
use std::env;
use std::error::Error;

/// Lido contract ABI
abigen!(
    LidoContract,
    r#"[
        function submit(address referral) public payable returns (uint256)
    ]"#,
);

/// Restaking protocol trait
#[async_trait]
pub trait RestakingProtocol {
    async fn initialize(&self) -> Result<(), Box<dyn Error>>;
    async fn stake(&self, amount: U256) -> Result<TxHash, Box<dyn Error>>;
    async fn unstake(&self, amount: U256) -> Result<(), Box<dyn Error>>;
}

/// Lido restaking struct
pub struct Lido {
    client: Provider<Http>,
    contract: LidoContract<Provider<Http>>,
}

impl Lido {
    pub async fn new() -> Result<Self, Box<dyn Error>> {
        dotenv().ok();

        let rpc_url = env::var("ETHEREUM_RPC_URL").expect("Missing ETHEREUM_RPC_URL");
        let lido_contract_address = "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84".parse::<Address>()?; // Lido contract address

        let provider = Provider::<Http>::try_from(rpc_url)?;
        let contract = LidoContract::new(lido_contract_address, provider.clone());

        Ok(Self { client: provider, contract })
    }
}

#[async_trait]
impl RestakingProtocol for Lido {
    async fn initialize(&self) -> Result<(), Box<dyn Error>> {
        println!("Lido contract initialized at {:?}", self.contract.address());
        Ok(())
    }

    /// Stake ETH and receive stETH
    async fn stake(&self, amount: U256) -> Result<TxHash, Box<dyn Error>> {
        let tx = self.contract
            .submit(Address::zero()) // No referral address
            .value(amount)
            .send()
            .await?;

        println!("Staking transaction sent! TX Hash: {:?}", tx.tx_hash());
        Ok(tx.tx_hash())
    }

    /// Unstake stETH (requires a DeFi service like Curve or Uniswap)
    async fn unstake(&self, amount: U256) -> Result<(), Box<dyn Error>> {
        println!("Direct unstaking from Lido is not possible.");
        println!("Convert stETH to ETH via Curve or Uniswap.");

        // Simulate unstaking logic (Could integrate Curve/Uniswap API later)
        Ok(())
    }
}
