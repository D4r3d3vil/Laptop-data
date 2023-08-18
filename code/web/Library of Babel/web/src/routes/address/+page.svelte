<script>
let search_term, result=''
import {searchAddress} from '../library'
</script>
<input type="text" bind:value={search_term} on:keyup={async function(){
    if(search_term=="") return result=""
    result = "Searching..."
    setTimeout(async function(){
        await searchAddress(search_term)
    .then((data)=>result=data)
    .catch((e)=>result='No book found.')
    }, 5000)
    }} placeholder="Enter Address:">
<p>{result}</p>