 
// EJERCICIO 1


  //HIJO
  const getDonuts = async () => {
    return fetch('https://gist.githubusercontent.com/Oskar-Dam/62e7175dc542af53a9d18cb292422425/raw/a6cce2b68ea13a77ec5ea7bdfb4df8f23f9ae95f/donuts.json')
    .then(response => response.json());
}


//PADRE
const fetchDonuts = async () => {
    try {
        const result = await getDonuts();
        return result;
    }
    catch (error) {
        console.log(error.message);
    }
}
fetchDonuts();


fetchDonuts().then(element => {
    // LISTA DE DONUTS
    const donutsList = element.items.item;
    const arraySugars = donutsList.map((sugar) => {
        let sugars = sugar.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars;
        let sugarWithoutString = sugars.split(/(\g)/);  
        return  parseInt(sugarWithoutString[0])
    });

    //ORDENAR LOS DONUTS PARA COLOCAR EL QUE MAS AZUCAR PRIMERO
    arraySugars.sort((a, b) => b - a);

    const donutWithMostSugar = arraySugars[0];
    console.log(`El donut con más azúcar es de: ${donutWithMostSugar} gramos`);

    const donut = element.items.item;
    let maxIronPercentage = -1;
    let donutWithMaxIron = 0;

    donut.forEach(element => {
        const ironVitamin = element.nutrition_facts.nutrition.vitamines.find (vitamin => vitamin.type === "Iron");
        const ironPercentage = parseFloat(ironVitamin.percent);
        maxIronPercentage = ironPercentage;
        donutWithMaxIron = element ;     
        
    });
    console.log(`El donut con el mayor hierro es: ${donutWithMaxIron.name} con un ${maxIronPercentage}%`);

    let maxProteinAmount = -1;
    let donutWithMaxProtein = 0;
    donut.forEach(donut => {
          const proteinAmount = parseFloat(donut.nutrition_facts.nutrition.proteine.replace("g", ""));
          maxProteinAmount = proteinAmount;
          donutWithMaxProtein = donut;
      });
    console.log(`El donut con mas proteinas es: ${donutWithMaxProtein.name} con un ${maxProteinAmount}%`);

    let minFiberAmount = 1;
    let donutWithLessFiber = 0;
    
    donut.forEach(donut => {
        const carbsDetail = donut.nutrition_facts.nutrition.carbohydrate.carbs_detail;
        if (carbsDetail && carbsDetail.type && carbsDetail.type.fibre) {
          const fiberAmount = parseFloat(carbsDetail.type.fibre.replace("g", ""));
          if ( fiberAmount <= minFiberAmount) {
            minFiberAmount = fiberAmount;
            donutWithLessFiber = donut;
          }
        }
      });
    console.log(`El donut con menos fibra es:${donutWithLessFiber.name} con un ${minFiberAmount}%`);


    //EJERCICIO 2
    console.log();
    console.log();
    console.log(`                    EJERCICIO 2               `);
    console.log("----------------------------------------------");



    console.log("MOSTRAR DONUTS Y CALORIAS:")
    donut.forEach(donut => {
        const name = donut.name;
        const calories = donut.nutrition_facts.nutrition.calories;
        console.log(`Donut:${name} & Calories:${calories}`);
    })
    console.log("MOSTRAR DONUTS Y SUS CARBOHIDRATOS:")
  
    donut.forEach(donut => {
        const name = donut.name;
        const carbohydrates = donut.nutrition_facts.nutrition.carbohydrate.carbs_detail;
        
        console.log(`Donut:${name} & Carbohidratos:`);
        console.log(carbohydrates);
      });

    let totalCalories = 0;

    donut.forEach(donut => {
    const calories = donut.nutrition_facts.nutrition.calories;
    totalCalories += calories;
      });
    const mediaCalories = totalCalories / donut.length;
    console.log(`La media de calorias con todos los donuts es de:${mediaCalories} calorias`);

    let saturatedCalories = 0;
    
    donut.forEach(donut => {
        const saturated = parseFloat(donut.nutrition_facts.nutrition.fat.fat_type.saturated.replace("g", ""));
        saturatedCalories += saturated;
    });
    console.log(`La suma de todas las grasas saturadas es de ${saturatedCalories}g`);


    //FALTA REMATAR
    donut.forEach(donut => {
        const vitamines = donut.nutrition_facts.nutrition.vitamines;
        vitamines.forEach(vitamine => {
            const vitamineName = vitamine.name;
            const percentage = parseFloat(vitamine.percent.replace("%",""));
        })
    })



}).catch(error => {
    console.error("Error al obtener los datos:", error);
});



