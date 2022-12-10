try {
    const mcontainer = document.querySelector('.m-container');
    let mcontent = document.querySelector('.m-content');
    let logout = mcontent.querySelector('#logout');

    logout.addEventListener('click', () => {
        document.location.href = "clear.php";
    })
} catch (err) { }
