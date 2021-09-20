import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import About from "./views/About.js";
import More from "./views/More.js";

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}



const router = async () => {
    const routes = [
        { path:"/", view: Dashboard },
        { path:"/posts", view: Posts },
        { path:"/about", view: About },
        { path:"/documents", view: () => console.log("Viewing Documents") },
        { path:"/more", view: More }
    ];

    //Test if user's url in the browser mathches any of the specified routes
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if(!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    }

    const viewPossible = () => {
        return new Promise ((resolve, reject) => { 
        const view = new match.route.view();
        resolve(view);
        return;
        });
    }
    viewPossible()
    .then(async (view) => {
        console.log("Matching view file has been found!");
        
        let app_body = await view.getHTML();
        document.querySelector("#app").innerHTML = app_body;
    }) 
    .catch((error) => {
        match.route.view()
        console.log(error)
    })
    

    

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
