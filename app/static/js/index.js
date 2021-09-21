import Posts from "./views/Posts.js";
import Dashboard from "./views/Dashboard.js";
import About from "./views/About.js";
import More from "./views/More.js";
import PostView from "./views/PostView.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    // console.log('keys: ', keys, 'values: ', values)
    // console.log(Array.from(match.route.path.matchAll(/:(\w+)/g)));

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]]
    }));
};

const navigateTo = url => { 
    history.pushState(null, null, url);
    router();
};



const router = async () => {
    
    const routes = [
        { path:"/", view: Dashboard },
        { path:"/posts", view: Posts },
        { path:"/posts/:id", view: PostView },
        { path:"/about", view: About },
        { path:"/documents", view: () => console.log("Viewing Documents") },
        { path:"/more", view: More }
    ];

    //Test if user's url in the browser mathches any of the specified routes
    const potentialMatches = routes.map(route => {
        //For every 'route' in 'routes' array this map operation returns object consisting of 'route' obj and 'result' obj containing result of regular expression created by taking 'path' from 'route' obj which is one element of the 'routes' array! whoooh.... but understandable 
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });
    

    //In 'potentialMatches' array .find method searches for 'potentialMatch' object with 'result' properity not equal to "null". It is later written to 'match' object
    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);
    
    //If none of the specified routes in 'routes' array matches user's choice this function executes. It creates 'match' object with the first route specified in the 'routes' array (by default index)
    if(!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }
    // console.log(match)
    const viewPossible = () => {
        return new Promise ((resolve, reject) => { 
        const view = new match.route.view(getParams(match));
        resolve(view);
        return;
        });
    }
    viewPossible()
    .then(async (view) => {
        // console.log("Matching view file has been found!");
        
        let app_body = await view.getHTML();
        document.querySelector("#app").innerHTML = app_body;
    }) 
    .catch((error) => {
        console.log(error)
        match.route.view()
    })
    
    // console.log(typeof(viewPossible))
    

};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", ()=>{
    document.body.addEventListener("click", (event) => {
        if (event.target.matches("[data-link]")) {
            event.preventDefault();
            navigateTo(event.target.href);
        }
    })
    router();
})
