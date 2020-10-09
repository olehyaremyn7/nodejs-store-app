const toCurrency = price => {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
    }).format(price)
}

const toDate = date => {
    return new Intl.DateTimeFormat('de-DE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(new Date(date))
}

document.querySelectorAll('.card-price').forEach(node => {
    node.textContent = toCurrency(node.textContent)
})

document.querySelectorAll('.order-date').forEach(node => {
    node.textContent = toDate(node.textContent)
})

const $cart = document.querySelector('#cart')
if ($cart) {
    $cart.addEventListener('click', event => {
        if (event.target.classList.contains('js-remove')) {
            const id = event.target.dataset.id;
            const csrf = event.target.dataset.csrf;
            fetch('/app/cart/remove/' + id, {
                method: 'delete',
                headers: {
                    'X-XSRF-TOKEN': csrf
                }
            }).then(res => res.json())
                .then(cart => {
                    if (cart.products.length) {
                        const html = cart.products.map(c => {
                            return `
                        <tr>
                            <th scope="row">#</th>
                            <td>${ c.title }</td>
                            <td>${ c.count }</td>
                            <td>
                                <button class="btn btn-info js-remove" data-id="${c.id}">Delete</button>
                            </td>
                        </tr>`
                        }).join('')
                        $cart.querySelector('tbody').innerHTML = html
                        $cart.querySelector('.cart-price').textContent = toCurrency(cart.price)
                    } else {
                        $cart.innerHTML = '<p class="no-prod">No items in Cart!</p>'
                    }
                })
        }
    })
}

