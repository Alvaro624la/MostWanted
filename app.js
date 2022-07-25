document.cookie = "SameSite=Strict; samesite=strict; Secure";
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
            //el loop añadirás al objeto "obj" las propiedades y valores
            FBIdataClean[prop] = val;
        };
        // A divertirse
        console.log(FBIdataClean);

        //------------------DOM beggins------------------
        let div = document.createElement('div');

        // female search
        female.addEventListener('click', () => {
            inputCity.value = '';
            inputFieldOffice.value = '';
            
            //reiniciar contenido de divs
            if(div.parentNode){
                div.parentNode.removeChild(div);
            }

            if(FBIdataClean.sex === 'Female'){
                // for the DOM (creates div to add the content)
                card.appendChild(div);
                div.className = 'card__div';

                //eliminar undefined alias
                if(FBIdataClean.aliases == undefined){
                    FBIdataClean.aliases = '';
                }

                div.innerHTML = `
                    <h3 id="nombre" class="card__nombre">${FBIdataClean.title}</h3>
                    <h3 id="alias" class="card__alias">${FBIdataClean.aliases}</h3>
                    <div class="card__img-cont">
                        <img id="img" class="card__img-cont__img" src="${FBIdataClean.images[0].thumb/*original*/}" alt='${FBIdataClean.title} image'>
                    </div>
                    <p id="subjects" class="card__subjects">${FBIdataClean.subjects}</p>
                    <p id="description" class="card__description">${FBIdataClean.description}</p>
                `;
            };
        });
        // male search
        male.addEventListener('click', () => {
            inputCity.value = '';
            inputFieldOffice.value = '';

            //reiniciar contenido de divs
            if(div.parentNode){
                div.parentNode.removeChild(div);
            };
            
            if(FBIdataClean.sex === 'Male'){
                // for the DOM (creates div to add the content)
                card.appendChild(div);
                div.className = 'card__div';

                //eliminar undefined alias
                if(FBIdataClean.aliases == undefined){
                    FBIdataClean.aliases = '';
                }

                div.innerHTML = `
                    <h3 id="nombre" class="card__nombre">${FBIdataClean.title}</h3>
                    <h3 id="alias" class="card__alias">${FBIdataClean.aliases}</h3>
                    <div class="card__img-cont">
                        <img id="img" class="card__img-cont__img" src="${FBIdataClean.images[0].thumb/*original*/}" alt='${FBIdataClean.title} image'>
                    </div>
                    <p id="subjects" class="card__subjects">${FBIdataClean.subjects}</p>
                    <p id="description" class="card__description">${FBIdataClean.description}</p>
                `;
            };
        });
        //other - search
        other.addEventListener('click', () => {
            inputCity.value = '';
            inputFieldOffice.value = '';

            //reiniciar contenido de divs
            if(div.parentNode){
                div.parentNode.removeChild(div);
            };

            //eliminar undefined alias
            if(FBIdataClean.aliases == undefined){
                FBIdataClean.aliases = '';
            }
            
            if(!FBIdataClean.sex){
                // for the DOM (creates div to add the content)
                card.appendChild(div);
                div.className = 'card__div';

                div.innerHTML = `
                    <h4 id="description" class="card__description">${FBIdataClean.description}</h4>
                    <div class="card__img-cont">
                        <img id="img" class="card__img-cont__img" src="${FBIdataClean.images[0].original}" alt='${FBIdataClean.title} image'>
                    </div>
                    <p id="subjects" class="card__subjects">${FBIdataClean.subjects}</p>
                    <p id="description" class="card__description">${FBIdataClean.description}</p>
                `;
            };
        });
        //field-office - search
        fieldOffice.addEventListener('submit', (e) => {
            //limpiar el resto de inputs
            inputCity.value = '';
            
            //neutralizar el comportamiento default de submit
            e.preventDefault();
            
            //reiniciar contenido de divs
            if(div.parentNode){
                div.parentNode.removeChild(div);
            };

            //limpiamos y normalizamos el texto del input
            let textLower = inputFieldOffice.value.trim().toLowerCase();

            //eliminar undefined alias
            if(FBIdataClean.aliases == undefined){
                FBIdataClean.aliases = '';
            }

            if(FBIdataClean.field_offices == textLower){
                inputFieldOffice.value = '';

                // for the DOM (creates div to add the content)
                card.appendChild(div);
                div.className = 'card__div';

                div.innerHTML = `
                    <h3 id="nombre" class="card__nombre">${FBIdataClean.title}</h3>
                    <h3 id="alias" class="card__alias">${FBIdataClean.aliases}</h3>
                    <div class="card__img-cont">
                        <img id="img" class="card__img-cont__img" src="${FBIdataClean.images[0].original}" alt='${FBIdataClean.title} image'>
                    </div>
                    <h4 id="description" class="card__description">${FBIdataClean.description}</h4>
                    <p id="subjects" class="card__subjects">${FBIdataClean.subjects}</p>
                `;
            };
        });
        //city - search
        city.addEventListener('submit', (e) => {
            //limpiar el resto de inputs
            inputFieldOffice.value = '';

            //neutralizar el comportamiento default de submit
            e.preventDefault();

            //reiniciar contenido de div
            if(div.parentNode){
                div.parentNode.removeChild(div);
            };     

            //limpiamos y normalizamos el texto del input
            let textLower = inputCity.value.trim().toLowerCase();
            //capitalizamos la primera letra
            let textUpper = textLower.charAt(0).toUpperCase() + textLower.slice(1);

            //eliminar undefined alias
            if(FBIdataClean.aliases == undefined){
                FBIdataClean.aliases = '';
            }

            if(FBIdataClean.place_of_birth == textUpper){
                inputCity.value = '';

                // for the DOM (creates div to add the content)
                card.appendChild(div);
                div.className = 'card__div';

                div.innerHTML = `
                    <h3 id="nombre" class="card__nombre">${FBIdataClean.title}</h3>
                    <h3 id="alias" class="card__alias">${FBIdataClean.aliases}</h3>
                    <div class="card__img-cont">
                        <img id="img" class="card__img-cont__img" src="${FBIdataClean.images[0].original}" alt='${FBIdataClean.title} image'>
                    </div>
                    <h4 id="description" class="card__description">${FBIdataClean.description}</h4>
                    <p id="subjects" class="card__subjects">${FBIdataClean.subjects}</p>
                `;
            };
        });
    };
});

//PENDIENTE:
//city input: 
    //arreglar nombres de "ciudad, pais".
    //separar por coma y eliminar pais?

//no data messaje 
    //ERROR: como recorre todos los hijos, siempre va a haber divs que ejecuten éste 'else' o condicion 'if'(div.childNodes[0] == undefined)
    // p.innerHTML = `<span class="no-data-span">NO DATA for</span> ${inputCity.value}`;
    
//clickar a x card --> muestra toda la info de esa persona/objeto, en pantalla completa