use async_trait::async_trait;
use ethers::{
    prelude::*,
    types::{Address, U256},
};
use std::sync::Arc;
use std::error::Error;

/// Lido contract ABI
abigen!(
    LidoContract,
    r#"[
        function submit(address referral) external payable returns (uint256)
    ]"#,
);

pub struct Lido {
    provider: Arc<Provider<Http>>,
    contract: LidoContract<Provider<Http>>,
}

impl Lido {
    pub async fn new(rpc_url: &str) -> Result<Self, Box<dyn Error>> {
        let provider = Arc::new(Provider::<Http>::try_from(rpc_url)?);
        let lido_address = "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84".parse::<Address>()?;
        let contract = LidoContract::new(lido_address, provider.clone());

        Ok(Self { provider, contract })
    }
}

#[async_trait]
impl RestakingProtocol for Lido {
    async fn initialize(&self) -> Result<(), Box<dyn Error>> {
        println!("Lido contract initialized at {:?}", self.contract.address());
        Ok(())
    }

    /// Stake ETH into Lido and receive stETH
    async fn stake(&self, amount: U256) -> Result<(), Box<dyn Error>> {
        let wallet = Wallet::from_mnemonic("your twelve word seed phrase here")?
            .connect(self.provider.clone());

        let tx = self.contract
            .submit(Address::zero()) // No referral
            .value(amount)
            .send()
            .await?;

        println!("Staking transaction sent. TX Hash: {:?}", tx.tx_hash());
        Ok(())
    }

    /// Unstaking requires DeFi like Curve (Lido does not allow direct unstaking)
    async fn unstake(&self, amount: U256) -> Result<(), Box<dyn Error>> {
        println!("Lido does not support direct unstaking.");
        println!("To unstake, convert stETH to ETH via Curve or Uniswap.");
        Ok(())
    }
}
