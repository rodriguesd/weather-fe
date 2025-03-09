export async function getWorkoutLogs(email, password, username) {
    const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({

            identity: email,
            identityType: "EMAIL",
            password: password,
            username: username

        })
    });

    const result = await response.json();
    return result.errors;
}