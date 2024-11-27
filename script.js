const input = document.querySelector('input')
const btn = document.querySelector('button')
const logo = document.querySelector('img')
const name = document.querySelector('#name')
const username = document.querySelector('#username')
const area = document.querySelector('#location')
const repo = document.querySelector('#repo')
const followers = document.querySelector('#followers')
const following = document.querySelector('#following')
const profileLink = document.querySelector('#profile-link')
const loader = document.querySelector('.loader')


btn.addEventListener('click', async (e)=>{
    handleSearch()
})

//for enter key pressed
input.addEventListener('keydown', (e)=>{
         if(e.key === "Enter"){
             handleSearch()
         }
})
 
const handleSearch = async ()=> {
    loader.style.display = "block"
       if(input.value === ''){
        document.querySelector('#error').innerText = "Please Fill username"
            document.querySelector('#error').style.display = "block"
            loader.style.display = "none"
            input.value = ''
            return
       }
       loader.style.display= "block"
       document.querySelector('#error').style.display = "none"
      await fetchData(input.value)
       loader.style.display = "none"
       input.value = ''
}

const fetchData = async (usernamee)=>{
           const response = await fetch(`https://api.github.com/users/${usernamee}`)
           if(response.status === 404){
           
                document.querySelector('#error').innerText = "Invalid Username"
             document.querySelector('#error').style.display = "block"
             input.value = ''
             return
           }
           document.querySelector('#error').style.display = "none"
           const data = await response.json()
           logo.src = data.avatar_url
           name.innerText = `${data.name}`
           username.innerHTML = `<b>Username:</b> ${data.login}`
           area.innerHTML = `<b>Location: </b>${data.location}`
           repo.innerHTML = `<b>Repo: </b>${data.public_repos}`
           followers.innerHTML = `<b>Followers: </b>${data.followers}`
           following.innerHTML = `<b>Following: </b>${data.following}`
           profileLink.innerText = 'Visit Profile'
           profileLink.href = data.html_url
           console.log(data)
}