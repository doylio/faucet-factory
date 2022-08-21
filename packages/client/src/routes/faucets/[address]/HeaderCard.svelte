<script lang="ts">
    export let name: string;
    export let symbol: string;
    // export let imageUrl: string;
</script>

<div class="row">
    <div class="row-left">
        <div class="token-img" />
        <!-- <img src={faucet.imageUrl} alt={faucet.name} /> -->
        <div class="token-info">
            <h1>{name}</h1>
            <h2>{symbol}</h2>
        </div>
    </div>
    <div class="row-right">
        <slot />
    </div>
</div>


<style>
    .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .row-left {
        display: flex;
        align-items: center;
    }

    .token-img {
        height: 80px;
        width: 80px;
        border-radius: 100%;
        background-color: grey;
        margin-right: 1em;
    }
</style>