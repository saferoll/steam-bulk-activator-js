function isHidden(e) {
    var style = window.getComputedStyle(e)
    return (style.display === 'none')
}

function activate(key) {
    console.log('\n===== Activating ' + key + ' =====')
    document.getElementById('product_key').value = key
    if (document.getElementById('accept_ssa').checked === false) {
        document.getElementById('accept_ssa').click()
    }
    setTimeout(function () {
        document.getElementById('register_btn').click()
    }, 100)
}

function checkPage(s) {
    console.log('...')
    let errorDisplay = document.getElementById('error_display')
    let receiptForm = document.getElementById('receipt_form')
    let registerForm = document.getElementById('registerkey_form')

    if (!isHidden(receiptForm)) {
        s.wait = false
        console.log(receiptForm.firstElementChild.textContent.trim())
        console.log(document.getElementById('registerkey_productlist').textContent)
        DisplayPage('code') // show registerkey_form
    } else if (!isHidden(registerForm)) {
        if (s.wait && !isHidden(errorDisplay)) {
            s.wait = false
            console.log(errorDisplay.textContent)
            errorDisplay.style.display = "none" // hide before activating next key (or else we won't wait properly for receipt_form to appear)
        }
        if (!s.wait) {
            if (s.index === s.keys.length) return
            s.wait = true
            activate(s.keys[s.index++])
        }
    }

    setTimeout(function () { checkPage(s) }, 500)
}

checkPage({
    index: 0,
    wait: false,
    keys: [
        'XXXXX-XXXXX-XXXXX',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
    ]
})
