function tsp_hk(distance_matrix) {
    var numberOfCities = distance_matrix.length; // Get the number of cities

    if (numberOfCities == 0 || distance_matrix[0].length == 0) { //Check for empty matrix or a matrix with no cities (this gets test 1 and 2 to pass)
        return 0;
    }

    //The code right below is pretty much identical to the code in the else block far below (lines 98-114) as we are doing the same
    //thing but in the else block we are finding the shortest tour for this perticular start and for
    //the code below we are looking at finding the the shortest tour out of all of the possible starts
    var shortestLengthTour = Infinity; //Use this to find the overall shortest path
    var cache = []; //Make our cache for memoization

    for (var startCity = 0; startCity < numberOfCities; startCity++) { //This code iterates through all possible start cities and find the shortest path out of them
        var cities = []; //Make a list of our cities to visit
        for (var i = 0; i < numberOfCities; i++) { //Push the cities we want to visit to it
            cities.push(i);
        }
        var currentTourLength = tsp_hk_rec(cities, startCity); //Find the tour length for this specific start city
        var shortestLengthTour = Math.min(shortestLengthTour, currentTourLength); //Find the shortest tour out of all of the possible cities
    }

    //Nested the function in here so I dont have to pass as many paremeters
    function tsp_hk_rec(cities, start) { // Recurvsive part of hk 
        if (cities.length == 1) { //If there is only one city left
            return distance_matrix[start][cities[0]]; //We return the distance from the start to that city
        } 

        else { //If there more than one we need to make a list of cities we need to visit and find the shortest path
            var key = JSON.stringify(cities) + start; //Make a key
            //console.log(key);
            if (cache[key] != undefined) { //Check our cache first
                //console.log("Hit the cache");
                return cache[key];
            }

            var minLengthTour = Infinity; //Make a variable to hold the minimum distance
            const newCities = []; //Make our new list of cities to visit

            for (var i = 0; i < cities.length; i++) { //Add all of the cities except start to our new list of cities
                if (cities[i] != start) {
                    newCities.push(cities[i]);
                }
            }

            for (var i = 0; i < newCities.length; i++) { //Iterate through our list of new cities to find the shortest path
                var currentTourLength = tsp_hk_rec(newCities, newCities[i], cache) + distance_matrix[start][newCities[i]]; //Recursivly call our function to find the minimum length and then add the distance from the start to get the total length
                var minLengthTour = Math.min(minLengthTour, currentTourLength); //Set the overall minimum length tour
            }

            cache[key] = minLengthTour; //Add to our cache
            return minLengthTour; //Return the smallest tour
        }
    }
    return shortestLengthTour; //Return our overall shortest tour
}
