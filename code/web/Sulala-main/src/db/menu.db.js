import {writable} from 'svelte/store'
let tm = "https://th.bing.com/th/id/OIP.CTb2C2NfamjWafHfdo-lZwHaHa?w=184&h=184&c=7&r=0&o=5&dpr=1.3&pid=1.7"
let c = "caffeine"
let m = "milk"
let cr = "creme"
let s = "syrup"
let v = "vanilla"
let e = "espresso"
let ch = "chocolate"
let n = "nut"
let natural = "natural"
let rlist = ["Italian “expresso”  The word espresso comes from Italian and means “expressed” or “forced out”. Espresso is made by forcing very hot water under high pressure through finely ground, compacted coffee",
    "In Turkey, the bridegroom was once required to make a vow during the wedding to always make sure to provide their wives with coffee. If they did not do so it was considered grounds for divorce.",
    "In Turkey, the intended bride is required to serve coffee to her parents and future husband when he comes to ask for her hand in marriage; however, she has no say so in the outcome of the request. Tradition has it that her response is in the sweetness or lack thereof of the coffee. Sweet coffee supposedly means she is okay with the arrangement while salty means she is not.",
    "Contrary to popular belief, espresso has one-third the caffeine of a cup of coffee, simply due to serving size differences.",
    "King Frederick of Germany created a special task force to search out illicit coffee smugglers. The task force was known as the Kaffee Schnuffler. The king believed that soldiers who drank coffee were not dependable.",
    "Excelso or Supremo do not mean a better quality of coffee when used to describe coffee beans, it refers to the size of the coffee bean.",
    "In 1674 a group of London women formed a group called WPAC (Women's Petition Against Coffee). They didn't like the amount of time their husbands spent in coffee houses rather than being home (where they belonged).",
    "Beethoven counted the number of coffee beans he used to make his coffee and insisted on 60 beans per cup.",
    "During the American Civil War soldiers who were craving coffee and couldn't get it tried roasting sweet potatoes and corn to make a beverage similar to coffee. It obviously didn't become a popular choice.",
    "Tips, such as is left in restaurants for good service, comes from the days of the London coffeehouses where there were brass boxes monogrammed on the front with $ to ensure promptness. This encouraged customers to pay for expeditious service.",
    "Brazil produced a postal stamp that smelled like coffee in December 2001. It was designed to promote their coffee and the smell is supposed to last for up to 5 years.",
    "Coffee grounds sprinkled on the ground around plants and the garden will stop snails and slugs from eating the plants.",
    "Oil is the most widely used commodity in the world, coffee is next in line.",
    "Water is the only beverage more popular than coffee.",
    "Coffee contains over 1200 chemicals and over half of those are responsible for creating its flavor.",
    "The average coffee drinker consumes 3 cups of coffee per day.",
    "Just three countries consume 70% of the world's coffee: USA, France, Germany, Saudi Arabia.",
    "The Japanese believe that bathing in coffee grounds fermented with pineapple pulp will reduce wrinkles and beautify the skin.",
    "The first American to be granted a license as a coffee trader was Dorothy Jones of Boston and the year was 1670.",
    "Coffee beans are not really beans at all but berries from the coffee tree bush."
]
export let menu = writable(
    {
        en:{
    menus:{
        1:{
            feature: tm,
            feature_desc: "everything hot.",
            link: './en/menu/items/hot/',
            for: 'Hot drinks',
            iod: rlist[Math.ceil(Math.random() * rlist.length) - 1],
            hashtags: ['hazelnut', 'coconut', 'cookie', 'natural', 'toffee', 'saffron', 'turkish', "chocolate"],
            items:[
                {id: String(Math.random()), bid: String(Math.random()), lid: String(Math.random()), name: "Espresso", cid: String(Math.random()), did:String(Math.random()), img:tm, price: 9, detail: "A coffee -brewing method of Italian origin, in which a small amount of nearly boiling water is forced under 9 to 10 bars of pressure through finely-ground coffee beans.", contains:[c, e],available:true , items:{type: "menu", stuff:[{name: "cookie", available:true}, {name:"chocolate", available:true}, {name: "regular", available:true}], "cookie": {contains:[e, c], price:15, detail: "An espresso with aromatic notes of cookie."}, "chocolate": {contains:[ch, c, e], price:15, detail: "A perfected espresso with hints of chocolate."}, "regular":{contains:[e, c], price:9, detail: "A coffee -brewing method of Italian origin, in which a small amount of nearly boiling water is forced under 9 to 10 bars of pressure through finely-ground coffee beans."}}},
                {id: String(Math.random()), bid: String(Math.random()),name: "Turkish Coffee", cid: String(Math.random()), img:tm,did:String(Math.random()), contains: [c, natural], detail: "Very finely ground coffee brewed by boiling. Any coffee bean may be used; arabica varieties are considered best, but robusta or a blend is also used. The coffee grounds are left in the coffee when served.",available:true,items: {type: "toggle", on:{price:7, contains:[m, c],}, off:{price:7, contains:[c],}, detail: m}},
                {id: String(Math.random()), bid: String(Math.random()),name: "Coconut", img:tm, cid: String(Math.random()),did:String(Math.random()), contains: [natural], detail: "Drink that delicately mixes coffee with coconut, without the taste of the former being hidden behind the imposing flavor and aroma of the latter. Coconut coffee is a beverage with coffee as a base and coconut as a secondary component, either in milk or oil.",available:true,items:{type: "toggle", on:{price: 18, contains:[c, m, cr, s],}, off:{price:15, contains:[m, cr, s],},detail: e}},
                {id: String(Math.random()), bid: String(Math.random()),name: "Cortado", contains:[c],cid: String(Math.random()),did:String(Math.random()), img:tm, nop:true,detail: "Coffee made out of one part espresso and one part milk. The milk encompasses 50% of the drink so that the bitterness of the espresso is made more subtle and therefore drinkable. And it isn’t made with just any type of milk; instead, steamed milk is used to make a cortado.",available:true, price: 11},
                {id: String(Math.random()), bid: String(Math.random()),name: "Cookie creme", cid: String(Math.random()),did:String(Math.random()),contains:[m, s],img:tm,detail: "Both creamy and satisfying. Cookies and cream iced coffee is made with cookies and cream ice cream to thicken it. Ice cream works well for thickening iced coffees.", available:true,nop:true, price:11},
                {id: String(Math.random()), bid: String(Math.random()), lid: String(Math.random()), cid: String(Math.random()),did:String(Math.random()),contains:[m, c], price: 11, detail: "A latte or caffè latte is a milk coffee that boasts a silky layer of foam as a real highlight to the drink. A true latte will be made up of one or two shots of espresso, steamed milk and a final, thin layer of frothed milk on top. Comes in multiple flavors",name: "Lattee",available:true, img:tm, items:{type: "menu", stuff:[{name: "regular", available:true}, {name: "toffee", available:true}, {name: "saffron", available:true}, {name: "spanish", available:true}, {name: "pistachio", available:true}], "regular":{contains:[m, c], price:11, detail: "A regular latte"}, "toffee": {contains:[m, c, s], price:11, detail: "A latte with a delicious drizzle of toffee with an optional syrup additive"}, "saffron": {contains:[m, c], price:14, detail: "The subtle sweetness and earthy flavor of saffron pairs beautifully with this creamy espresso-based latte."}, "spanish": {contains:[m, c, e, s], price:13, detail: "café con leche, is coffee mixed with hot, usually scalded, milk. As the name implies, this drink originated in Spain, but it is now equally popular across Latin America, the Philippines, and certain parts of Florida and Saudi Arabia.",}, "pistachio": {contains:[s, c, e, n], price:14, detail: "milk-based beverage flavoured with pistachio. The pistachio flavour typically comes in the form of a syrup and nut, giving the drink a warm, sweet richness with a toasted, nutty, and earthy edge.",}}},
                {id: String(Math.random()), bid: String(Math.random()), lid: String(Math.random()), price: 3,did:String(Math.random()),cid: String(Math.random()), name: "Tea", detail: "An aromatic beverage prepared by pouring hot or boiling water over cured or fresh leaves of Camellia sinensis, an evergreen shrub native to East Asia which probably originated in the borderlands of southwestern China and northern Myanmar.",contains: [natural],available:true, img:tm, items:{type: "menu", stuff:[{name: "regular", available:true}, {name: "morrocan", available:true}, {name: "green", available:true}, {name: "english", available:true}], "regular":{contains:[n], price:3, detail: "Normal tea",}, "morrocan": {contains:[n], price:4, detail: "Moroccans take great pride in their tea and will often ask a visitor who among their group of friends makes the best cup of tea, and a minimum of two to three cups needs to be drunk so as not to offend the host.",}, "green": {contains:[n], price:3, detail: "just like normal tea, except it has not oxidized. It is proven to have various medicinal properties.",}, "english": {contains:[n], price:4, detail: "full-bodied, robust, rich and blended to go well with milk and sugar, in a style traditionally associated with a hearty English breakfast.",}, "natural": {}}},
                {id: String(Math.random()), bid: String(Math.random()),name: "Picollo", did:String(Math.random()),contains: [c], cid: String(Math.random()),img:tm,detail: "A single ristretto shot pulled into a 90ml glass and then topped up with steamed milk. The result is a small, strong drink with a bitter taste.", nop:true,available:true ,price: 11},
                {id: String(Math.random()), bid: String(Math.random()),name: "Macchiato", did:String(Math.random()),contains: [c, m], cid: String(Math.random()),img:tm,detail: "Dark, rich espresso. The quantity of milk is just enough to lighten the color of the coffee and pierce the smooth, black surface.",available:true, nop:true, price: 11},
                {id: String(Math.random()), bid: String(Math.random()), lid: String(Math.random()), did:String(Math.random()),price: 11, contains:[natural], cid: String(Math.random()),name: "French",detail: "We always pay attention to detail to provide a whole new coffee experience.",available:true ,img:tm, items:{type: "menu", stuff:[{name: "vanilla", available:true}, {name: "hazelnut", available:true}, {name: "vanilla espresso", available:true}, {name: "hazelnut espresso", available:true}], "vanilla":{contains:[v], price:11, detail: "a delicious drink with side-notes of vanilla extract. Providing the ultimate taste",}, "vannila espresso": {contains:[v, e, c], price:15, detail: "Medium-roast coffee with notes of vanilla extract. The flavoring is usually added during the roasting process to enhance the taste ",}, "hazelnut": {contains:[n], price:11, detail: "Fun fact: contrary to popular belief, hazelnut is actually a fruit.",}, "hazelnut espresso": {contains:[e, n, c], price:15, detail: "Combining the best of each kind, deliviring an exquisite taste.",}}},
                {id: String(Math.random()), bid: String(Math.random()),name: "Hot Chocolate",did:String(Math.random()), contains: [ch, m], img:tm, cid: String(Math.random()),detail: "Semisweet chocolate grated into small flakes and stirred. Cocoa refers to a drink made with cocoa powder, hot milk, and sweetened to taste with sugar",nop:true,available:true, price: 11},
                {id: String(Math.random()), bid: String(Math.random()),name: "Restritto",did:String(Math.random()), contains: [c], img:tm, nop:true, cid: String(Math.random()),detail: "Being the origin of the infamous Picallo, ristretto means restricted in Italian. A barista prepares ristretto from the first portion of espresso. With a rich flavor and a higher concentration, the coffee is not bitter because of its extraction method.",available:true,price: 9},
                {id: String(Math.random()), bid: String(Math.random()),name: "Americano",did:String(Math.random()), contains:[c], img:tm, nop:true, cid: String(Math.random()),detail: "An espresso drink much like cappuccinos and lattes. It is made entirely from espresso and water, giving it a similar consistency to drip coffee. Although it looks and smells like a drip coffee, Americanos actually have a very different flavor profile because of how they were brewed.",available:true,price: 9},
                {id: String(Math.random()), bid: String(Math.random()),name: "Longo", contains:[c],did:String(Math.random()), img:tm, nop:true, cid: String(Math.random()),available:true,detail: "A type of espresso that uses twice as much water as a standard shot and extracts for about twice as long.",price: 9},
                {id: String(Math.random()), bid: String(Math.random()),name: "Cappacino", did:String(Math.random()),contains:[c, m], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "Made of a shot of espresso and steamed and frothed milk. A classic cappuccino generally contains equal amounts of milk foam and steamed milk. It is also one of the most famous beverages in the world.",price: 11},
                {id: String(Math.random()), bid: String(Math.random()),name: "Saudi coffee", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "A hot brew made from Coffea arabica beans. It is grown at 1,000 to 2,000m and is originally from Yemen. It is light to dark in color, tastes plain or spicy/bitter and is served in tiny decorative cups called (finjan).",price: 5},
                {id: String(Math.random()), bid: String(Math.random()),name: "Flat White", did:String(Math.random()),img:tm, contains:[c, e, m], nop:true, cid: String(Math.random()),available:true,detail: "A coffee drink consisting of espresso with microfoam (steamed milk with small, fine bubbles and a glossy or velvety consistency).",price: 11},
            ]    
           },
           2:{
            feature: tm,
            feature_desc: "cold/iced",
            link: './pages/en/menu/items/iced-cold/',
            for: 'Cold drinks',
            iod: rlist[Math.ceil(Math.random() * rlist.length)],
            hashtags: ["latte", "choclate"],
            items:[
                {id: String(Math.random()), bid: String(Math.random()), lid: String(Math.random()), name: "Latte", cid: String(Math.random()), did:String(Math.random()), img:tm, price: 9, detail:"A latte or caffè latte is a milk coffee that boasts a silky layer of foam as a real highlight to the drink. A true latte will be made up of one or two shots of espresso, steamed milk and a final, thin layer of frothed milk on top. Comes in multiple flavors", contains:[c, m],available:true , items:{type: "menu", stuff:[{name: "vanilla", available:true}, {name:"honey", available:true}, {name: "sulala", available:true}, {name: "count espresso", available:true},{name: "regular", available:true}, {name: "toffee", available:true}, {name: "spanish", available:true}, {name: "saffron", available:true}, {name: "pistachio", available:true}, {name: "caramel", available:true}], "vanilla":{available:true, price:14, contains:[s,m,c], detail:"A delicous latte infused with vanilla syrup and powder"}, "honey":{available:true, price:14, contains:[s,m,c], detail:"honey latte; A natural delight!"}, "sulala":{available:true, price:14, contains:[s,m,c], detail:"our signature latte"}, "count espresso":{available:true, price:14, contains:[s,m,c], detail:"espresso + latte"}, "regular":{available:true, price:14, contains:[s,m,c], detail:"regular "}, "vanilla":{available:true, price:14, contains:[s,m,c], detail:"vanilla (fresly ground) infused latte"}, "toffee": {price: 14, contains:[s, c], detail:"A latte with a delicious drizzle of toffee with an optional syrup additive"}, "spanish":{price: 16, contains:[m, c, e], detail:"consists of milk, condensed milk, pistachio and our secret ingredient!"}, "saffron":{price: 16, contains:[m, c, e], detail:"100% real saffron"}, "pistachio":{price: 16, contains:[m, c, e], detail:"delicious syrup imported from italy!"}, "caramel":{price: 16, contains:[m, c, e], detail:"delicious."}}},
                {id: String(Math.random()), bid: String(Math.random()),name: "Macciato", cid: String(Math.random()), img:tm,did:String(Math.random()), contains: [c, natural], detail: "An espresso with a splash of milk",available:true, nop:true, price:15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Americano", img:tm, cid: String(Math.random()),did:String(Math.random()), contains: [natural], detail: "An espresso drink much like cappuccinos and lattes. It is made entirely from espresso and water, giving it a similar consistency to drip coffee.",available:true, price:10, nop:true},
                {id: String(Math.random()), bid: String(Math.random()),name: "Salted caramel", contains:[c],cid: String(Math.random()),did:String(Math.random()), img:tm, nop:true,detail: " Flavored coffee drink made with caramel sauce and sea salt.",available:true, price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Cookie creme", cid: String(Math.random()),did:String(Math.random()),contains:[m, s],img:tm,detail: "For the oreo lovers", available:true,nop:true, price:13},
                {id: String(Math.random()), bid: String(Math.random()),name: "French vanilla", cid: String(Math.random()),did:String(Math.random()),contains:[m, s],img:tm,detail: "A sweet, creamy beverage with a smooth taste and can be enjoyed hot or iced.", available:true,nop:true, price:14},                
                {id: String(Math.random()), bid: String(Math.random()),name: "Hazelnut cappacino", did:String(Math.random()),contains: [c], cid: String(Math.random()),img:tm,detail: "A combination of cocoa powder, skimmed milk and coffee with a slight hazelnut", nop:true,available:true ,price: 14},
                {id: String(Math.random()), bid: String(Math.random()),name: "Chocolate", did:String(Math.random()),contains: [c, m], cid: String(Math.random()),img:tm,detail: "A chocolate-flavoured warm beverage that is a variant of a caffè latte (Italian: [kafˈfɛ lˈlatte]), commonly served in a glass rather than a mug.",available:true, nop:true, price: 14},
                {id: String(Math.random()), bid: String(Math.random()),name: "Mocha",did:String(Math.random()), contains: [ch, m], img:tm, cid: String(Math.random()),detail: "A chocolate-flavoured warm beverage that is a variant of a caffè latte (Italian: [kafˈfɛ lˈlatte]), commonly served in a glass rather than a mug",nop:true,available:true, price: 14},
                {id: String(Math.random()), bid: String(Math.random()),name: "Signature",did:String(Math.random()), contains: [c], img:tm, nop:true, cid: String(Math.random()),detail: "Our specailty!",available:true,price: 16},
                {id: String(Math.random()), bid: String(Math.random()),name: "Boooom",did:String(Math.random()), contains:[c], img:tm, nop:true, cid: String(Math.random()),detail: "*Explosions (of flavor) in your mouth*",available:true,price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Frappacino", contains:[c],did:String(Math.random()), img:tm, nop:true, cid: String(Math.random()),available:true,detail: "It consists of coffee or crème base, blended with ice and ingredients such as flavored syrups and usually topped with whipped cream and or spices. (better than starbucks)",price: 16},
                {id: String(Math.random()), bid: String(Math.random()),name: "Marshmello", did:String(Math.random()),contains:[c, m], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "Combine this with biscuit and youve just made a smores drink.",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Cotton Candy", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "Wow...",price: 20},
                {id: String(Math.random()), bid: String(Math.random()),name: "Red Velvet", did:String(Math.random()),img:tm, contains:[c, e, m], nop:true, cid: String(Math.random()),available:true,detail: "A mild amalgamation of chocolate and vanilla with a velvety subtle tang of buttermilk.",price: 14},
                {id: String(Math.random()), bid: String(Math.random()),name: "White Mocha", cid: String(Math.random()), img:tm,did:String(Math.random()), contains: [c, natural], detail: "A milk-based coffee drink made with espresso, white chocolate, and steamed milk.",available:true,items: {type: "toggle", on:{price:16.1, contains:[m, c],}, off:{price:16, contains:[c],}, detail: "slushy?"}},
            ]    
           },
           3:{
            feature: tm,
            feature_desc: "crepes / pancakes / waffles can it get any better?",
            link: './pages/en/menu/items/desert/',
            for: 'Desert',
            iod: rlist[Math.ceil(Math.random() * rlist.length)],
            hashtags: ["pistachio", "kinder"],
            items:[
                {id: String(Math.random()), bid: String(Math.random()),name: "Blueberry Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Red Velvet Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Crunchy Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Date cake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Sulala Oreo Cup", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Sulala Lotus Cup", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Sulala Marshmello Cup", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Pancake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Waffle", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Fruit Waffle", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Cookie", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Blueberry Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Blueberry Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Blueberry Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Blueberry Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Blueberry Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Blueberry Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Blueberry Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Blueberry Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Blueberry Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Blueberry Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Blueberry Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Blueberry Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Blueberry Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Blueberry Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Blueberry Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Blueberry Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Blueberry Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Blueberry Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Blueberry Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Blueberry Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Blueberry Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Blueberry Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Blueberry Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Blueberry Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Blueberry Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
                {id: String(Math.random()), bid: String(Math.random()),name: "Blueberry Cheesecake", did:String(Math.random()),contains:[natural], img:tm, nop:true, cid: String(Math.random()),available:true,detail: "",price: 15},
            ]    
           },
    }
}
    }
        )