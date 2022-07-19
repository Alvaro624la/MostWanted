//VARIABLES
//DOM
let main = document.getElementById('main');
let card = document.getElementById('card');
let nombre = document.getElementById('nombre');
let alias = document.getElementById('alias');
let img = document.getElementById('img');
let crimen = document.getElementById('crimen');
let p = document.getElementById('noDataP');
//SEARCHER
let female = document.getElementById('female');
let male = document.getElementById('male');
let other = document.getElementById('other');
let fieldOffice = document.getElementById('field-office');
    let inputFieldOffice = document.getElementById('inputFieldOffice');
let city = document.getElementById('city');
    let inputCity = document.getElementById('inputCity');
    
//------------------FETCH beggins------------------

const getData = async() => {
    const response = await fetch('https://api.fbi.gov/wanted/v1');
    const data = await response.json();
    return data;
}
getData().then(data => {
    const FBIdata = new Array(data);
    //conseguimos un array de 20 FBIitems(objetos)
    const FBIitems = FBIdata[0].items;

//------------------NULLs CLEANER beggins------------------

    //SELECCIONAR solo el PRIMER objeto(item) --> para el proceso de creación de la funcionalidad limpiadora de nulls
    const firstFBIitem = FBIitems[0];

    //LIMPIADOR de 'NULL's FUNCIONAL para TODOS LOS FBIitems. Uso el bucle FOR envolviendo toda ésta funcionalidad
    for(let i = 0; i < FBIitems.length; i++){
        //uso el i para que afecte a todos los x items
        let allFBIitem = FBIitems[i];
    
        //ELIMINAR todos los NULL y devolver objeto limpio "obj"
        let itemEntries = Object.entries(allFBIitem); //(ES8)
        
        //variables ()
        let itemsWithData = new Array();
        const FBIdataClean = new Object();

        itemEntries.map(e => {
            //si el 2o indice(n1) de cada entrie NO es null, añadelo al array 'itemsWithData'.
            if(e[1] != null){
                itemsWithData.push(e);
            }
        });
        //loop para el array de entries buenos y pasarlo de array a objeto de nuevo
        for(let i = 0; i < itemsWithData.length; i++){
            //iteramos todos los entries filtrados
            let iteraciones = itemsWithData[i];
            //seleccionamos lo que serán las propiedades
            let prop = iteraciones[0];
            //seleccionamos lo que serán los valores
            let val = iteraciones[1];
            //el loop añadirá al objeto "obj" las propiedades y valores
            FBIdataClean[prop] = val;
        };
        // A divertirse
        // console.log(FBIdataClean);

        //------------------DOM beggins------------------

        //for the DOM (creates div to add the content)
        let div = document.createElement('div');
        card.appendChild(div);
        div.className = 'card__div';

        //----------delete empty divs function----------
        if(div.childNodes[0] === undefined){
           div.style.display = 'none';
        };
        
        // female search
        female.addEventListener('click', () => {
            //reiniciar contenido de div
            div.innerHTML = '';
            p.innerHTML = '';
            inputFieldOffice.value = '';
            inputCity.value = '';
            div.style.display = 'none';

            if(FBIdataClean.sex == 'Female'){
                div.style.display = 'block';

                div.innerHTML = `
                    <h3 id="nombre" class="card__nombre">${FBIdataClean.title}</h3>
                    <h3 id="alias" class="card__alias">${FBIdataClean.aliases}</h3>
                    <div class="card__img-cont">
                        <img id="img" class="card__img-cont__img" src="${FBIdataClean.images[0].thumb/*original*/}" alt='${FBIdataClean.title} image'>
                    </div>
                    <p id="description" class="card__description">${FBIdataClean.description}</p>
                `;
            };
        });
        //male search
        male.addEventListener('click', () => {
            //reiniciar contenido de div
            div.innerHTML = '';
            p.innerHTML = '';
            inputFieldOffice.value = '';
            inputCity.value = '';
            div.style.display = 'none';
        
            if(FBIdataClean.sex == 'Male'){
                div.style.display = 'block';
                div.innerHTML = `
                    <h3 id="nombre" class="card__nombre">${FBIdataClean.title}</h3>
                    <h5 id="alias" class="card__alias">${FBIdataClean.aliases}</h5>
                    <div class="card__img-cont">
                        <img id="img" class="card__img-cont__img" src="${FBIdataClean.images[0].original}" alt='${FBIdataClean.title} image'>
                    </div>
                    <p id="description" class="card__description">${FBIdataClean.description}</p>
                `;
            };
        });
        //other - search
        other.addEventListener('click', () => {
            //reiniciar contenido de div
            div.innerHTML = '';
            p.innerHTML = '';
            inputFieldOffice.value = '';
            inputCity.value = '';
            div.style.display = 'none';

            if(!FBIdataClean.sex){
                div.style.display = 'block';

                div.innerHTML = `
                    <h4 id="description" class="card__description">${FBIdataClean.description}</h4>
                    <div class="card__img-cont">
                        <img id="img" class="card__img-cont__img" src="${FBIdataClean.images[0].original}" alt='${FBIdataClean.title} image'>
                    </div>
                    <p id="details" class="card__details">${FBIdataClean.details}</p>
                `;
            };
        });
        //field-office - search
        fieldOffice.addEventListener('submit', (e) => {
            //reiniciar contenido de div
            div.innerHTML = '';
            div.style.display = 'none';
            p.innerHTML = '';
            inputCity.value = '';

            //neutralizar el comportamiento default de submit
            e.preventDefault();

            //limpiamos y normalizamos el texto del input
            let textLower = inputFieldOffice.value.trim().toLowerCase();

            if(FBIdataClean.field_offices == textLower){
                div.style.display = 'block';
                inputFieldOffice.value = '';

                div.innerHTML = `
                    <h3 id="nombre" class="card__nombre">${FBIdataClean.title}</h3>
                    <h3 id="alias" class="card__alias">${FBIdataClean.aliases}</h3>
                    <div class="card__img-cont">
                        <img id="img" class="card__img-cont__img" src="${FBIdataClean.images[0].original}" alt='${FBIdataClean.title} image'>
                    </div>
                    <h4 id="description" class="card__description">${FBIdataClean.description}</h4>
                    <p id="details" class="card__details">${FBIdataClean.details}</p>
                `;
            };
        });
        //city - search
        city.addEventListener('submit', (e) => {
            //reiniciar contenido de div
            div.innerHTML = '';
            div.style.display = 'none';
            p.innerHTML = '';
            inputFieldOffice.value = '';

            //neutralizar el comportamiento default de submit
            e.preventDefault();

            //limpiamos y normalizamos el texto del input
            let textLower = inputCity.value.trim();
            //capitalizamos la primera letra
            let textUpper = textLower.charAt(0).toUpperCase() + textLower.slice(1);

            ////////////////////////////////////arreglar nombres de "ciudad, pais".
            ////////////////////////////////////separar por coma y eliminar pais?
            if(FBIdataClean.place_of_birth == textUpper){
                inputCity.value = '';
                div.style.display = 'block';

                div.innerHTML = `
                    <h3 id="nombre" class="card__nombre">${FBIdataClean.title}</h3>
                    <h3 id="alias" class="card__alias">${FBIdataClean.aliases}</h3>
                    <div class="card__img-cont">
                        <img id="img" class="card__img-cont__img" src="${FBIdataClean.images[0].original}" alt='${FBIdataClean.title} image'>
                    </div>
                    <h4 id="crimen" class="card__crimen">${FBIdataClean.description}</h4>
                    <p id="crimen" class="card__crimen">${FBIdataClean.details}</p>
                `;
            } 
            //////////////////////////////////como recorre todos los hijos, siempre va a haber divs que ejecuten éste 'else' o condicion 'if'(div.childNodes[0] == undefined)
            if(div.parentNode.childNodes.style.display == 'none'){
                //no data message
                p.innerHTML = `<span class="no-data-span">NO DATA for</span> ${inputCity.value}`;
            };
        });
    };
});