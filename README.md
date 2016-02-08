# Web_App_from_Scratch
#http://onwezen.github.io/Web_App_from_Scratch/Opdrachten/

#Opdracht 2: Onderzoek Frameworks & Libraries

Wat ik heb ontdekt tijdens mijn studie & werk is dat Javascript zonder frameworks
vrij beperkt is in zijn eigen kunnen. Tuurlijk kunnen er CMS systemen gemaakt worden
met alleen pure javascript, dit is echter heel erg inefficient en waar je dan op uit komt
is hetzelfde als duizenden andere programmeurs al voor jou hebben gemaakt. Wat ik persoonlijk
dus erg fijn vind werken is een framework die wat meer object oriented werkt zodat die stap
minder werk kost.

Zelf gebruik ik bijna dagelijks jQuery aangezien vrijwel elke site dit gebruikt. Een van de vele
voordelen is zo al meteen dat wanneer je aan iemands anders code werkt je niet in een onbekende
framework meteen stapt maar gewoon met jQuery aan de slag kan. jQuery maakt het leven een stuk makkelijker
door objecten van selectors te maken waar je vervolgens weer alles mee kan doen. Het handigste aan jQuery
is dat DOM elementen makkelijker aangeroepen kunnen worden en dus ook bijvoorbeeld CSS changes op een bepaald
element makkelijker gaan.

Een ander voorbeeld wat ik ga gebruiken is AngularJS. AngularJS zorgt voor een MVC structuur
(model - view - controller) in JavaScript. Er wordt dus object oriented geprogrammeerd d.m.v. models
die objecten bevatten die meerdere keren aangemaakt en aangeroepen kunnen worden door de controller
die dat vervolgens weer in je daadwerkelijke html pagina zetten in je view. Angular gebruikt erg veel
in-line javascript, zo moet je denken aan if statements (conditionals) en zelfs for loops in de <button> annotatie. 
Angular maakt dit wel weer verwarrend voor nieuwe programmeurs omdat het soms lastig overzichtelijk te houden is
als hier niet door de developer aan de juiste standaard gehouden wordt. 

Wat het nadeel is van deze frameworks/libraries is dat deze niet gebouwd zijn voor mobile.
Veel frameworks zullen veel slomer dan standaard javascript zijn en dus op mobile devices
niet de verwachtte snelheid van zijn acties bereiken. Door deze slome reactie tijd kan het soms
zelfs gevaarlijk zijn als timeout errors niet goed worden opgevangen. Een ander nadeel is dat een
library als jQuery heel erg groot is en dus de website een stuk zwaarder maakt om te laden. Meestal gebruikt
een website maar een heel klein deel van de jQuery library en toch moet de hele library ingeladen te worden.

Persoonlijk zie ik alsnog vrij weinig nadelen hieraan binnen jQuery aangezien het de code ook weer een stuk sneller
kan maken. Er hoeven veel minder regels geschreven te worden voor complexe functies en dit kan dus erg veel processing
tijd schelen.

Een ander nadeel aan jQuery kan zijn dat mensen spaghetti code van jQuery maken. Developers proberen veel te vaak
jQuery als een framework te gebruiken wat het niet is, het is een library. Zo kunnen functies heel erg traag worden
omdat mensen een spaghetti sliert aan functies maken die allemaal aangeroepen en uitgevoerd worden voordat er bij de 
desbetreffende functie is.

Het gebruik van een framework kan ook betekenen dat je aan een aantal limitieten vast zit. Dan kan er natuurlijk gewoon weer
overgestapt worden op javascript in hetzelfde stukje code maar dit kan voor problemen zorgen als daadwerkelijk alles in je code 
vast zit gebakken in een framework en het lastig wordt objecten uit te lezen om hier vervolgens weer iets mee te doen dat buiten
de functies van de framework valt.


#Conclusie:

Het gebruik van een framework is zeker aangeraden als er kennis is van het framework en er een goede structuur is uitgedacht.
Het is af te raden om een framework te gebruiken voor kleine web applicaties aangezien het dan weinig meerwaarde heeft en het
alleen de web app slomer maakt doordat een gigantische library/framework wordt ingeladen op de pagina.
Een library zoals jQuery kan erg handig zijn voor het versimpelen van functies, het gaat hier vooral om functies die andere
mensen al een keer voor jou hebben gebouwd en daar komt bijv. jQuery van pas aangezien je het dan niet zelf allemaal hoeft te herschrijven.


#Sources
https://angularjs.org/

https://www.quora.com/Are-there-any-disadvantages-of-using-Javascript-framework-like-jQuery#http://stackoverflow.com/questions/25152506/benefits-and-drawbacks-of-using-client-side-frameworks

http://1stwebdesigner.com/pros-cons-frameworks/

#Opdracht 3: Onderzoek Single page web app

Single page webapps zijn de laatste jaren erg populair, denk bijvoorbeeld aan outlook wat een grote single page is.
Buiten de grote webapps om zien we de laatste jaren op vele (bedrijfs) websites de langste scroll websites waar op een
web page alle informatie wordt gegeven en de gebruiker hier doorheen scrolled.

Een van de grootste voordelen is dat de pagina niet opnieuw geladen wordt elke keer. Dit zorgt ervoor dat de gebruiker
gewoon een smooth pagina krijgt met wanneer het ooit voorkomt loading balkjes binnen de page, wat toch een stuk netter is
dan de browser die de hele pagina in delen weer opnieuw laad.

Aangezien ik zelf voor een marketing/consultancy bureau werk en veel gebruik maak van Google Analytics en SEO is een van de nadelen
voor mij dat het lastig is om pagina's te meten aangezien Analytics gebruik maakt van pageviews. Natuurlijk is hier wel een oplossing voor,
virtual page views, alleen kost dit een hoop tijd om op te zetten. Vaak doen developers van grote websites dit zelf aangezien vrijwel elke winstgevende website
wel Google Analytics gebruikt wordt hier tijdens development wel aangedacht. Ook voor dingen als SEO is het lastig omdat natuurlijk maar 1 pagina op google weergegeven
kan worden, als er dan naar een specifiek deel van de pagina gezocht wordt (denk bijvoorbeeld aan een productcategorie waar iemand op googled) kan dit niet met een single page app.
Een oplossing hiervoor zijn hashes, wat wel goed werkt in Google maar verschillende search engines vatten dit weer anders op.

#Sources

https://en.wikipedia.org/wiki/Single-page_application
https://www.manning.com/books/single-page-web-applications