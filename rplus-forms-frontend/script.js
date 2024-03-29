let typeId = -1;

document.querySelectorAll('.data').forEach(div => {
    div.style.display = 'none';
});

function addRow() {
    const table = document.getElementById("musicTable").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(table.rows.length);
    const cellCount = 8; // Количество ячеек в строке

    for (let i = 0; i < cellCount; i++) {
        const cell = newRow.insertCell(i);
        const input = document.createElement("input");
        input.type = "text";
        input.className = "form-control";
        cell.appendChild(input);
    }
}

function deleteRow() {
    const table = document.getElementById("musicTable").getElementsByTagName('tbody')[0];
    const lastRowIndex = table.rows.length - 1;

    if (lastRowIndex >= 0) {
        table.deleteRow(lastRowIndex);
    }
}

function getMusicData() {
    const rows = document.querySelectorAll('#musicTable tbody tr');
        const musics = [];

        rows.forEach(row => {
            const cells = row.querySelectorAll('input');
            const music = {
                id: parseInt(cells[0].value) || null,
                title: cells[1].value || null,
                duration: cells[2].value || null,
                instrumentalAuthorFIO: cells[3].value || null,
                wordAuthorFIO: cells[4].value || null,
                executor: cells[5].value || null,
                manufacturerOfPhonogram: cells[6].value || null,
                licenseTerm: cells[7].value
            };
            musics.push(music);
        });

    // const jsonData = {
    //     musics: musics
    // };

    return musics;
}

function getRoyaltyData() {
    const rows = document.querySelectorAll('#royaltiesTable tbody tr');
        const royalityDatas = [];

        rows.forEach(row => {
            const cells = row.querySelectorAll('input');
            const royalty = {
                firstRow: cells[0].value || null,
                secondRow: cells[0].value || null,
            };
            royalityDatas.push(royalty);
        });

    // const jsonData = {
    //     royalityDatas: royalityDatas || null
    // };

    return royalityDatas;
}

function countryFix() {
    let country = document.getElementById('country').value;
    if (country.slice(-1) === 'я'){country = country.slice(0, -1) + "и"}
    if (country.slice(-1) === 'ь'){country = country.slice(0, -1) + "и"}
    if (country === 'Россия' || country === 'России'){country = 'РФ'}
    if (country.slice(-1) === 'а' && country.slice(-2) === 'ш'){country = country.slice(0, -1) = 'и'}
    if (country.slice(-1) === 'а' && country.slice(-2) !== 'ш'){country = country.slice(0, -1) = 'ы'}
    return country;    
}


function submitForm() {
            // Получение данных из формы
            const formData = {
                id: document.getElementById('formId').value || 0,
                country: countryFix() || null,
                fio: document.getElementById('fio').value || null,
                fioTP: document.getElementById('fioTP').value || null,
                nickName: document.getElementById('nickName').value || null,
                agreementDate: document.getElementById('agreementDate').value || null,
                passData: {
                    passportID: document.getElementById('passportID').value || null,
                    passportSeries: document.getElementById('passportSeries').value || null,
                    issued: document.getElementById('issued').value || null,
                    departmentCode: document.getElementById('departmentCode').value || null,
                    dateOfIssue: document.getElementById('dateOfIssue').value || null,
                    email: document.getElementById('email').value || null,
                    accountNumber: document.getElementById('accountNumber').value || null,
                    payeesBank: document.getElementById('payeesBank').value || null,
                    bic: document.getElementById('bic').value || null,
                    correspondentAccount: document.getElementById('correspondentAccount').value || null,
                    cardNumber: document.getElementById('cardNumber').value || null
                },
                royalityDatas: getRoyaltyData(),
                musics: getMusicData()
            };


            fetch('http://127.0.0.1:5000/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formData
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Ответ от сервера:', data);
            })
            .catch(error => {
                console.error('Произошла ошибка:', error);
            });

            console.log(JSON.stringify({
                formData
            }))
}

function submitType() {
    const contractType = document.getElementById('contractType').value;
    const previouslyReleased = document.getElementById('previouslyReleased').value;

    let link = '';

    document.querySelectorAll('.data').forEach(div => {
        div.style.display = 'none';
    });

    // document.getElementById('submitButton').style.display = 'block';
    document.getElementById('generateButton').style.display = 'block';
    if (contractType === 'exclusive' && previouslyReleased === 'yes') {
        typeId = 2;
        link = 'https://disk.yandex.ru/i/ppnvGxjxV0G34g';
        document.getElementById('data1').style.display = 'block';
        document.getElementById('nickNameBlock').style.display = 'none';
        document.getElementById('fioTPBlock').style.display = 'none';
        document.getElementById('data4').style.display = 'block';
    } else if (contractType === 'exclusive' && previouslyReleased === 'no') {
        typeId = 1;
        link = 'https://disk.yandex.ru/i/7Ir0sEAxYBTp6A';
        document.getElementById('data1').style.display = 'block';
        document.getElementById('data2').style.display = 'block';
        document.getElementById('data3').style.display = 'block';
        document.getElementById('data4').style.display = 'block';
        document.getElementById('applIdBlock').style.display = 'none';
    } else if (contractType === 'nonExclusive' && previouslyReleased === 'yes') {
        typeId = 2;
        link = 'https://disk.yandex.ru/i/SsGhaW2SJbX87Q';
        document.getElementById('data1').style.display = 'block';
        document.getElementById('nickNameBlock').style.display = 'none';
        document.getElementById('fioTPBlock').style.display = 'none';
        document.getElementById('data4').style.display = 'block';
    } else if (contractType === 'nonExclusive' && previouslyReleased === 'no') {
        typeId = 1;
        link = 'https://disk.yandex.ru/i/BUw8ywTquE0Mlw';
        document.getElementById('data1').style.display = 'block';
        document.getElementById('data2').style.display = 'block';
        document.getElementById('data3').style.display = 'block';
        document.getElementById('data4').style.display = 'block';
        document.getElementById('applIdBlock').style.display = 'none';
    }

    document.getElementById('resultText').innerText = "Ваша ссылка на документ готова!";
    document.getElementById('resultText').href = link;
    lisenceTermPlaceholder()
}

function lisenceTermPlaceholder() {
    const contractType = document.getElementById('contractType').value;

    if (contractType === 'exclusive') {
        document.getElementById('licenseTerm').placeholder = '3 года';
        document.getElementById('licenseTerm').value = '3 года';
    }
    else if (contractType === 'nonExclusive') {
        document.getElementById('licenseTerm').placeholder = '1 год';
        document.getElementById('licenseTerm').value = '1 год';
    }
}


function generateJSON() {
    const formData = {
        typeId: typeId || null,
        id: document.getElementById('formId').value || null,
        applId: parseInt(document.getElementById('applId').value) || null,
        country: countryFix() || null,
        fio: document.getElementById('fio').value || null,
        fioTP: document.getElementById('fioTP').value || null,
        nickName: document.getElementById('nickName').value || null,
        agreementDate: document.getElementById('agreementDate').value || null,
        passData: {
            passportID: document.getElementById('passportID').value || null,
            passportSeries: document.getElementById('passportSeries').value || null,
            issued: document.getElementById('issued').value || null,
            departmentCode: document.getElementById('departmentCode').value || null,
            dateOfIssue: document.getElementById('dateOfIssue').value || null,
            email: document.getElementById('email').value || null,
            accountNumber: document.getElementById('accountNumber').value || null,
            payeesBank: document.getElementById('payeesBank').value || null,
            bic: document.getElementById('bic').value || null,
            correspondentAccount: document.getElementById('correspondentAccount').value || null,
            cardNumber: document.getElementById('cardNumber').value || null
        },
        royalityDatas: getRoyaltyData(),
        musics: getMusicData()
    };

    const jsonString = JSON.stringify(formData, null, 2);

    // Создание Blob и ссылки для скачивания
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Создание ссылки и скачивание файла
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formData.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
