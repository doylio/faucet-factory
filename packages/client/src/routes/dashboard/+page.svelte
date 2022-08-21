<script lang="ts">
    import Button from '$lib/button/Button.svelte';
    import Card from '$lib/card/Card.svelte';

    const faucets = [{
        address: "p129834y",
        name: "Pools Token",
        symbol: "PT",
        imageUrl: "http://image.com",
        claimCount: 30
    }, {
        address: "12983124",
        name: "DeFi USDC",
        symbol: "dUSDC",
        imageUrl: "http://another.com",
        claimCount: 123,
    }, {
        address: "1209483213",
        name: "Test DAI",
        symbol: "DAI",
        imageUrl: "",
        claimCount: 0
    }];
</script>

<div class="heading">
    <h1>My Faucets</h1>
    <Button href="/faucets/new">
        Create Faucet
    </Button>
</div>

<Card>
    {#each faucets as faucet}
        <a href="/faucets/{faucet.address}">
            <div class="row">
                <div class="row-left">
                    <div class="token-img" />
                    <!-- <img src={faucet.imageUrl} alt={faucet.name} /> -->
                    <div class="token-info">
                        <h3>{faucet.name}</h3>
                        <div>{faucet.symbol}</div>
                    </div>
                </div>
                <div class="row-right">
                    <div>{faucet.claimCount} claims</div>
                </div>
            </div>
        </a>
    {/each}
</Card>

<style>
    .heading {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 2em 0;
    }

    .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1em;
        color: var(--text-color);
        cursor: pointer;
    }

    .row:hover {
        background-color: var(--branding-light);
    }

    .row-left {
        display: flex;
        align-items: center;
    }

    .token-img {
        height: 3em;
        width: 3em;
        margin-right: 1em;
        background-color: grey;
        border-radius: 100%;
    }

    .token-info {
        
    }

</style>