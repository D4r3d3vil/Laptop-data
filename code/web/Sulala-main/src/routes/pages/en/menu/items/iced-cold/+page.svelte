<script>
    import {menus} from '../../menu.db'
    let ons = []
    let unavailable = []
    let path = menus.en.menus[2]
    let current_hashtag = ""
    let searchTerm, hashtagTerm;
    let icons = {'natural': "🌲", "milk": "🥛", "caffeine": "🫘", "creme": "☁️", "chocolate": "🍫", "nut": "🌰", "syrup": "🥤", "vanilla": "💮", "espresso": "☕"}
    searchTerm = ''
    hashtagTerm = ''
    function toggle(id, val, otherval, b_id, bval, botherval, c_id, cval, cotherval){
        let b = document.getElementById(b_id) 
        let i = document.getElementById(id) 
        console.log(i.innerHTML)
        if(ons.includes(c_id)){
            ons.pop(c_id)
        }else{
            ons.push(c_id)
        }
        if(i.innerHTML.includes(val)){
            i.innerHTML = "price: " + otherval
            b.innerHTML = bval
        }
        else{
            i.innerHTML = "price: " + val
            b.innerHTML = botherval
        }
        ons = ons
}
function inp_chng(id, listid, list, c_id, d_id){
    let priceid = document.getElementById(id)
    let inpid = document.getElementById(listid)
    if(ons.includes(listid)){
        ons.pop(c_id, list[inpid.value].contains)
        ons = ons
    }else{
        ons.push(c_id, list[inpid.value].contains)
        ons = ons
    }
    try{
    priceid.innerHTML = "price: " + list[inpid.value].price
    }
    catch{
        priceid.innerHTML = "price: " + list['regular'].price
    }
    console.log(ons.includes(listid))
    console.log(ons)
    menu_detail(listid, list, d_id)
}
function inp_clear(list_id, Var){
    document.getElementById(list_id).value = ""
    Var = ""
}
function toggle_detail(detailmsgid, detail){
if(document.getElementById(detailmsgid).innerHTML == ""){
    document.getElementById(detailmsgid).innerHTML = detail
}else{
    document.getElementById(detailmsgid).innerHTML = ""
}
}
function menu_detail(input_id, list, desc_id){
    if(document.getElementById(desc_id).innerHTML == ""){
        if(document.getElementById(input_id).value != ""){
        document.getElementById(desc_id).innerHTML = list[document.getElementById(input_id).value].detail
    }else{
        document.getElementById(desc_id).innerHTML = list["regular"].detail
    }
}
    else{
        document.getElementById(desc_id).innerHTML = ""
    }
}
function hashtag_search(hashtag_id){
current_hashtag = hashtag_id
hashtagTerm = hashtag_id
console.log(hashtagTerm)
}
function remove_hashtags(){
    current_hashtag = ""
    hashtagTerm = ""
}
function add_to_unavailable(item){
unavailable.push(item)
unavailable = unavailable
console.log(unavailable)
}
    </script>
    <div class="body">
<h6><a href="../../../../../" class="back">⇽ back to menu</a></h6>
<h2>{path.for}:</h2>
<div class="allergens">
    <h3>Allergens and info:</h3>
    <h3 class="allergen">{icons.vanilla}: vanilla</h3>
    <h3 class="allergen cc">{icons.caffeine}: caffeine</h3>
    <h3 class="allergen">{icons.chocolate}: chocolate</h3><br>
    <h3 class="allergen c">{icons.creme}: creme</h3>
    <h3 class="allergen">{icons.espresso}: coffee</h3>
    <h3 class="allergen m">{icons.milk}: milk</h3><br>
    <h3 class="allergen">{icons.nut}: nut</h3>
    <h3 class="allergen">{icons.natural}: 100% natural</h3>
</div>
<br>
<p class="in">Info of the day: <iod class="in iod">{path.iod}</iod></p>
<h2>Menu: </h2>
<input type="search" placeholder="search: " bind:value={searchTerm} id="searcher" on:click={() => inp_clear( searchTerm)} class="in"><br><br>
<h3 style="display: inline;">popular🔥: </h3>
{#each path.hashtags as hashtag}
{#if current_hashtag != hashtag}
    <button id={hashtag} on:click={() => hashtag_search(hashtag)}>#{hashtag}</button>
{:else}
<button class="blue" on:click={remove_hashtags}>X {hashtag}</button>
{/if}
{/each}<br><div class="product-box">
{#each path.items as info}
{#if info.name.toLowerCase().includes(searchTerm)}
{#if info.nop}
{#if info.available}
{#if info.name.toLowerCase().includes(hashtagTerm) || info.contains.includes(hashtagTerm.toLowerCase())}
<div class="product"><product_name>{info.name}</product_name><br><product_price>price: {info.price}</product_price><br>{#each info.contains as icon}
    <div class="in">
        <p class="icon in">{icons[icon]}</p>
    </div>
    {/each}<br><button class="signature">Specialty</button>
    <br><img src={info.img} alt="..." ><button class="detail" on:click={() => toggle_detail(info.did, info.detail)}>description</button>
    <p id={info.did}> </p></div>
{/if}
{/if}
{:else}
{#if info.items.type == "toggle"}
{#if info.items.off.contains.includes(hashtagTerm) || info.items.on.contains.includes(hashtagTerm) || hashtagTerm == ""|| info.name.toLowerCase().includes(hashtagTerm.toLowerCase())}
<div class="product"><product_name>{info.name}</product_name><br><product_price id={info.id}>price: {info.items.off.price}</product_price>
    <br>
    {#if ons.includes(info.cid)}
    {#each info.items.on.contains as icon}
    <div class="in">
        <p class="in icon">{icons[icon]}</p>
    </div>
    {/each}
    {:else}
    {#each info.items.off.contains as icon}
        <div class="in">
            <p class="in icon">{icons[icon]}</p>
        </div>
    {/each}
    {/if}
    <br>
    <button id={info.bid} class="b" on:keydown={console.log("key pressed")} on:click={() => toggle(info.id, info.items.on.price, info.items.off.price, info.bid, info.items.detail + "&#x274c", info.items.detail + "&#9989;", info.cid, info.items.on.contains, info.items.off.contains)}>{info.items.detail}&#x274c</button><br>
    <img src={info.img} alt="...">
    <button class="detail" on:click={() => toggle_detail(info.did, info.detail)}>description</button>
    <p id={info.did}></p>
</div>
{/if}
{:else}
{#if info.items[hashtagTerm] != undefined || hashtagTerm == "" || info.name.toLowerCase().includes(hashtagTerm.toLowerCase())}
{#if info.available}
<div class="product"><product_name>{info.name}</product_name><br><product_price id={info.bid}>price: {info.price}</product_price>
    <br>
    {#if ons.includes(info.cid)}
    {#each ons[ons.indexOf(info.cid) + 1] as icon}
    <div class="in">
        <p class="in icon">{icons[icon]}</p>
    </div>
    {/each}
    {:else}
    {#each info.contains as icon}
    <div class="in">
        <p class="in icon">{icons[icon]}</p>
    </div>
    {/each}
    {/if}
    <br>
    <input type="text" list={info.id} on:change={() => inp_chng(info.bid, info.lid, info.items, info.cid, info.did)} id={info.lid} placeholder="choose type" on:click={() => inp_clear(info.lid)}>
    <br>
     <datalist id={info.id}>
        {#each info.items.stuff as thingy}
        {#if thingy.available}
        <option value={thingy.name}>
        {/if}
        {/each}
    </datalist>
    <img src={info.img} alt="...">
    <button class="detail" on:click={() => menu_detail(info.lid, info.items, info.did)}>description</button>
    <p id={info.did}> </p>
</div>
{/if}
{/if}
{/if}
{/if}
{/if}
{/each}
<br>
<p class="in">Coming soon:</p>
{#each unavailable as item}
<oos>{item}</oos>
{/each}
    </div>
    </div>
<style>
    .product{
        border: solid 2px black;
        width: 18vw;
        text-align: center;
        display: inline-block;
        margin-left: 1vw;
        margin-top: 2.5vh;
        font-size:70%;
        min-width: calc(20vh / 1.5);
        border-radius: 25%;
        max-width: 220px;
        max-height: 210px;
        background-color: black;
    }
    .product-box{
        margin-left: 3vw;
    }
    *{
        background-color: gold;
    }
    img{
        width: 16vw;
        height: 20vh;
        min-width: calc(20vh / 1.5);
        max-height: 100px;
        border-radius: 75%;
        max-width: 200px;
    }
    button.b{
        width: 18vw;
        min-width: 12vw;
        display: inline;
        text-align: center;
        height: 3vh;
        max-width: 200px;
        background-color: black;
        color: gold;
        border: solid 1px grey;
    }
    input[type="text"], option, datalist{
        width: 12vw; 
        min-width: calc(18vh / 1.5);
        text-align: center;
        height: 2.25vh;
        max-width: 200px;
        background-color: white;
        color: gold;
    }
    input[type="search"]{
        margin-left: 10vw;
        width: 50vw;
        height: auto;
        text-align: center;
        background-color: white;
        height: 3vmax;
        max-height: 30px;
    }
    .signature{
        width: 18vw;
        max-width: 220px;
        height: 3vh;
        border: solid 1px gray;
        background-color: black;
        color: gold;
        text-align: center;
    }
    product_name{
        background-color: black;
        color: gold;
        border-radius: 30%;
    }
    product_price{
        background-color: black;
        color: gold;
    }
    .icon{
        height: 5vh;
        width: 2vw;
        background-color: black;
        font-size: 3vmin;
        color: white;
        margin-right: -0.50vw;
    }
    .in{
      display: inline;
    }
    button.detail{
        background-color: black;
        color: white;
        border: solid 1px grey;
    }
    .allergen{
        margin-left: 3vmin;
        display: inline;
    }
    .blue{
        background-color: skyblue;
    }
    .back{
        font-size: 4vmin;
        text-decoration: none;
        font-weight: 200;
        color: black;
        max-width: 100px;
        max-height: 25px;
    }
    .iod{
        text-decoration: underline;
    }
</style>