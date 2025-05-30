const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const infoText = document.getElementById('popup_info')
const button = document.getElementById('button');
const info = document.getElementById('info_button');
const infoButton = document.getElementById('info-button');
const popup = document.getElementById('popup');
const closeBtn = popup.querySelector('.popup__close');
const API_URL = 'https://dummyjson.com/auth';
let accessToken = null;


async function postInfo(usernameValue, passwordValue) {
   const result = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: usernameValue,
            password: passwordValue,
        }),
    
    }) 
    const data = await result.json()
    console.log('res: ', data)
    accessToken = data.accessToken;

    console.log(accessToken);
}

async function fetchUserData() {
        try {
            const response = await fetch(`${API_URL}/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch user data');
            }

            return data;
        } catch (error) {
            throw new Error('Failed to fetch user information');
        }
    }


button.addEventListener('click', () => {
    const loginData = postInfo(username.value, password.value);

    info.style.display = "block";
    
    });

infoButton.addEventListener('click',() => {
    let firstName;
    popup.style.display = 'block';
    fetchUserData().then(result => {
        console.log(result.firstName);
        firstName = result.firstName;
        // infoText.innerText = `First Name : ${result.firstName} `
        
    }) 
    infoText.innerText = `First Name : ${firstName} `
});

closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.style.display = 'none';
  }
});
