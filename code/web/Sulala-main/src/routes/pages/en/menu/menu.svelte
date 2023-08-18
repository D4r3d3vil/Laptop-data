<script>
import {menu} from '../../../../db/menu.db'
let menus
menu.subscribe((value)=>{
    menus=value
})
</script>
<hr>
{#each Object.values(menus.en.menus) as catagory}
<div class="catagory"><h3><a href={catagory.link}>{catagory.for}</a></h3><img src={catagory.feature} alt="..." ><br><a href={catagory.link}>{catagory.feature_desc}</a></div>
{/each}
<style>
.catagory{
    text-align: center;
    border: solid 1px black;
    width: 30vmin;
    margin-left: 2.5vmin;
    display: inline-block;
}
img{
    width: 30vmin;
}
a{
    text-decoration: none;
}
</style>