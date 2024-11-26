const databaseURL = 'https://consultora-de-proyectos-default-rtdb.firebaseio.com/warmiEnergy.json';
let sendData = () => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data['saved'] = new Date().toLocaleString('es-CO', { timeZone: 'America/Guayaquil' });

    fetch(databaseURL, {
        method: 'POST', // Método de la solicitud
        headers: {
            'Content-Type': 'application/json' // Especifica que los datos están en formato JSON
        },
        body: JSON.stringify(data) // Convierte los datos a JSON
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            return response.json(); // Procesa la respuesta como JSON
        })
        .then(result => {
            alert('Agradeciendo tu preferencia, nos mantenemos actualizados y enfocados en atenderte como mereces'); // Maneja la respuesta con un mensaje
            form.reset()
        })
        .catch(error => {
            alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
        });
    //getData()
}
/*
let getData = async () => {
    try {

        // Realiza la petición fetch a la URL de la base de datos
        const response = await fetch(databaseURL);

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
        }

        // Convierte la respuesta en formato JSON
        const data = await response.json();

        if (data != null) {

            // Cuente el número de suscriptores registrados por fecha a partir del objeto data

            // Cuente el número de suscriptores registrados por fecha a partir del objeto data
            let countSuscribers = new Map()

            if (Object.keys(data).length > 0) {
                for (let key in data) {

                    let { email, saved } = data[key]

                    let date = saved.split(",")[0]

                    let count = countSuscribers.get(date) || 0;
                    countSuscribers.set(date, count + 1)
                }

                // Genere y agregue filas de una tabla HTML para mostrar fechas y cantidades de suscriptores almacenadas

                if (countSuscribers.size > 0) {

                    subscribers.innerHTML = ''

                    for (let [date, count] of countSuscribers) {
                        let rowTemplate = `
<tr>
<th scope="row">1</th>
<td>${date}</td>
<td>${count}</td>
</tr>`
                        subscribers.innerHTML += rowTemplate
                    }
                }

            }

        }
    } catch (error) {
        // Muestra cualquier error que ocurra durante la petición
        alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
    }
}
    */
let loaded = (eventLoaded) => {

    let myform = document.getElementById('form');

    myform.addEventListener('submit', (eventSubmit) => {
        eventSubmit.preventDefault();

        const emailElement = document.querySelector('.form-control-lg');
        const emailText = emailElement.value;

        if (emailText.length === 0) {
            emailElement.focus()
            return;
        }
        emailElement.animate(
            [
                { transform: "translateY(0)" },
                { transform: "translateY(50px)" },
                { transform: "translateY(-50px)" },
                { transform: "translateY(0)" }
            ],
            {
                duration: 400,
                easing: "linear",
            }
        )
        sendData();
    })

}
let ready = () => {
    console.log('DOM está listo');

}





window.addEventListener("DOMContentLoaded", ready);
window.addEventListener("load", loaded)