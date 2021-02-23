# 1. nap - 2021.02.22 - hétfő

*szerző: Balog Róbert*

## A csapat

A csapatunk összetételéről pár gondolat.
A korábbi Fourkolók névre keresztelt egyes csapat, azaz Gabi, Matyi, Jenő és Robi egyben maradtunk. Zsolt és Simon egy másik, a záróprojekt érdekében feloszlatott csapatból érkeztek együtt, Csaba pedig egyedül érkezett egy másik felbontott csoportból.
A csapatunk többségében főállásban dolgozó személyekből áll, így sejthető volt, hogy a késő délutáni, esti órákban fogunk tudni kooperálni.

## A nap fejleményei:

### Slack csoport
A délelőtti konzultációt követően összehoztam egy csoportot a Slacken a hét emberrel.

### Fork
Habár új emberek is csatlakoztak a csoporthoz, én maradtam a korábbi csoportfeladatok során alkalmazott eljárásnál és forkoltam a Józsi által közzétett repót.

### Új projekt
Klónoztam a repót a gépemre, majd a konzultációban is bemutatott módon létrehoztam ebbe a mappába egy új Angular projektet.

### Material-Dashboard bekötés
A projekthez mellékelt Material-Dashboard mappából az assets mappa lényegi tartalmát átmásoltam a projekt assets mappájába, majd az angular.json-ben bekötöttem a Dashboard css és js fájlját az alkalmazásba.
Annak érdekében, hogy látható legyen az eredmény, a Dashboard minta mappájában található egyik html tartamát átmásoltam az app.component.html-be. Természetesen csak a body elemeit, a css-eket, scripteket bekötéseit kitöröltem, hisz azt már megtettem az Angularban korábban.

### Induló repository és branch-ek
Az így kapott állapotot pusholtam a gitre és készítettem belőle egy dev, majd ebből egy-egy névre szóló branchet. A repóhoz pedig meghívtam a csapat többi tagját. Minderről slacken tájékoztattam is a társakat.

### Trello
Mindeközben Jenő és Gabi hozzáláttak a Trello regisztrációnk elkészítéséhez. Végül Jenő jutott elsőként a megoldáshoz, így létrehozta a csoportunkat, e-mailben pedig minden csapattagot meghívót. Így a mi dolgunk már roppant egyszerű volt. Egy név és egy jelszó megadásával már bent is voltunk a saját Trello felületünkön.

### Első közös meeting
Sikerült találnunk egy olyan időpontot, amely a többségnek alkalmas. 18:00-kor jöttünk össze a Teams felületén, a hét főből hatan, ami, ismerve a körülményeket, meglehetősen jó arány.

### Feladatkiírás értelmezése
Elsőként a feladatkiírást értelmeztük, hogy véletlenül se szülessenek eltérő értelémezések már a legelején. Miután mindent tisztáztunk, hozzáláttunk a tervezéshez.

### Tervezés
A közösen tölthető szűkös időnk végett úgy döntöttünk, hogy nem táblázzuk be a teljes projektet. Jenő már előkészítette a backlogot a meeting kezdetére, jelezve rajta a főbb entitásokat. A tervezés során pedig indulásként az osztályok, servicek és json állományok létrehozását tűztük ki elvégzendő feladatként. Ezeket pedig jelentkezéses módszerrel szét is osztottuk egymás között.
Ezzel kapcsolatban történt egy kis előre dolgozás. Simon a saját branchében a nap folyamán elkészítette az összes szükséges osztályt és erről küldött is pull requestet, amelyet el is fogadtam és mergeltem a dev branchbe.
Természetesen közösen átnéztük és a merget is közösen végeztük el.
Az osztályok mindeegyike tartalmazta a kiírásban szereplő kulcsokat és a hozzájuk rendelt típusokat is megfelelőnek találtuk. Így mindenki elvégezhette a dev branch állapotáról a saját branchébe a merget.
És hogy a tervezésben is előre dolgozzunk, kitűztünk pár további feladatot is, mint például a navbar és a routing komponensek.

### Kiosztott Feladatok    
- classes - Kövesdi Simon - test
- category service, json- Vadas Gabriella
- product service, json - Barta Mátyás
- customer service, json - Balog Róbert
- order service, json - Szakály Zsolt
- bill zervice, json - Varga Jenő
- navbar component - Kövesdi Simon
- routing component - Balog Róbert
    
### következő tervezési fázis feladatai
A csapat napközben, idejétől függően a slacken tud egymássla kommunikálni. A rá osztott feladatok elvégzésével pedig ki-ki szintén a szabadideje függvényében tud haladni.
Várhatóan ma este felé átbeszélnénk, hogy ki mivel, milyen szinten haladt. Ha kérdés, elakadás van, átbeszéljük.
Természetesen haladnánk tovább a tervezéssel.A táblánkra felvezetjük az elkészítendő komponenseket és hozzá is rendelnénk csapattagokhoz.
Ezek az egyes entitások lista és szerkesztő komponensei, valamint az oldalon megjelenő egyéb komponensek, mint a naigáció és a fejléc, amelyeket már kiosztottunk.

A közös konzultáció után sikerült beszélnek Csabával is, aki sajnos nem tudott részt venni a meetingen és sajnos a kedd reggeli stand upon sem tud jelen lenni. Ő gyermekorvos, este betegnél volt, reggel pedig rendelési ideje van. Ugyanakkor jelezte, hogy igyekszik felzárkózni és kivenni a részét a csapatmunkából.
A hiányzók dolgát megkönnyítendő abban maradunk, hogy a Teams-es konzultációinkat, stand upjainkat rögzítjük és elérhetővé tesszük a csapattagok számára a projekt végéig.
