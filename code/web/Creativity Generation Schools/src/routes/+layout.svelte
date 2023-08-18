<script>
    import { userData } from "../firebase/user-management";
    import Signin from "../components/Signin.svelte";
    import { onMount } from "svelte";
    let subdomain;
    onMount(async() => {
    let host = window.location.host;
    if(host.includes('.')){
    let subdomains = host.split(".");
    if (!subdomains) return;
    // if there is a subdomain, set it as a local variable
    if (subdomains[0] !== "www") {
      subdomain = subdomains[0];
    } else {
      if(subdomains.length>2){
        subdomain = subdomains[1]
      }else{
        return
      }
    }
    }
})
</script>
{#if !$userData.username&&!subdomain}
<Signin/>
{:else}
<slot/>
{/if}