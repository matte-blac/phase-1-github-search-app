    document.addEventListener('DOMContentLoaded', (e)=>{
    // Get the form element
    const form = document.querySelector('#github-form')

    // Add an event listener for form submission
    form.addEventListener('submit', function(e){
        // Prevent the form from submitting normally
        e.preventDefault();

        // Get the value of the input field
        const searchTerm = document.querySelector('#search').value

        // Make a request to the Github API
        fetch(`https://api.github.com/search/users?q=${searchTerm}`)
        .then(res => res.json())
        .then(data =>{
            const userList = document.querySelector("#user-list")
            userList.innerHTML='' // Clear previous list

            // Display user data on the page
            data.items.forEach(user => {
                const li = document.createElement('li')
                li.innerHTML = `<h2>${user.login}</h2>
                <a href = "${user.html_url}" target = "_blank">View Profile</a>`
                li.classList.add('user')
                li.dataset.username = user.login
                userList.appendChild(li)
            });
        });
    })
    // Add a click event listener to the user element
    document.addEventListener('click', function(e){
        if (e.target.classList.contains('user')) {
            const username = e.target.dataset.username

            // Make a request to the Github API
            fetch(`https://api.github.com/users/${username}/repos`)
            .then(res => res.json())
            .then(data =>{
                const repoList = document.querySelector("#repos-list")
                repoList.innerHTML='' // Clear previous list

                    // Display repo data on the page
                    data.forEach(repo => {
                        const li = document.createElement('li')
                        li.innerHTML = `<a href = "${repo.html_url}" target = "_blank">${repo.name}</a>`
                        repoList.appendChild(li)
                    });
                })
            }
        })
    })

    