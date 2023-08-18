<script>
    let search_term, result='', forbidden ='1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()-_=+[{]}\\;:' + "'" + '",<.>/?`~'
    import {browser} from '$app/environment'
    import {searchText} from '../library'
    function animateType(text){
        result = text
    }
    </script>
    {#if browser}
    <input type="text" bind:value={search_term} on:keyup={async function(){if(forbidden.includes(search_term[search_term.length-1])){return search_term=search_term.substring(0,search_term.length-1)} if(search_term==''){return result=''} animateType(await searchText(search_term))}}><br><br>
    <button on:click={function(){  navigator.clipboard.writeText(result.substring(19, result.length));}}>copy</button><br>
    <p>{result}</p>
    {/if}
    <style>
        :global(body){
            word-wrap: break-word;
        }
    </style>