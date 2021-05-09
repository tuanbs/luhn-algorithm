class LuhnAlgorithm {
    private _getCardType(creditCard: string, lengthNumber: Number): string {
        var isAmex = (creditCard.startsWith('34') || creditCard.startsWith('37')) && lengthNumber == 15;
        var isDiscover = creditCard.startsWith('6011') && lengthNumber == 16;
        var isMasterCard = (creditCard.startsWith('51') || creditCard.startsWith('52') || creditCard.startsWith('53') || creditCard.startsWith('54') || creditCard.startsWith('55')) && lengthNumber == 16;
        var isVisa = creditCard.startsWith('4') && (lengthNumber == 13 || lengthNumber == 16);
        if (isAmex) { return 'AMEX'; }
        else if (isDiscover) { return 'Discover'; }
        else if (isMasterCard) { return 'MasterCard'; }
        else if (isVisa) { return 'Visa'; }

        return 'Unknown';
    }

    checkCreditCard(creditCardRaw: string): string {
        let isValid = false;
        let creditCardType = '';

        // Remove space and accept only digits or spaces.
        let parsedCreditCard = creditCardRaw.split(' ').join('');
        if (!/[^0-9-\s]+/.test(parsedCreditCard)) {
            // console.log(`parsedCreditCard is: ${parsedCreditCard}`);
            let creditCardArr = parsedCreditCard.split('').map(i => Number(i)).reverse();
            let sum = creditCardArr[0];
            /* Step 1: Double every second digits (exclude the last digit). */
            for (let i = 1; i < parsedCreditCard.length; i++ ) {
                if (i % 2 != 0) {
                    creditCardArr[i] = creditCardArr[i] * 2;
                    // If greater than 9, then subtract 9.
                    if (creditCardArr[i] > 9) {
                        creditCardArr[i] = creditCardArr[i] - 9;
                    }
                }
                /*. Step 2: Take the sum of all the digits (including the check digit above). */
                sum += creditCardArr[i];
            }
            // console.log(`creditCardArr is: ${creditCardArr.reverse()}`);
            // console.log(`Sum is: ${sum}`);
            /*. Step 3: Check if the total modulo 10 is equal to 0 then the card is valid according to the Luhn formula; otherwise it is not valid. */
            if (sum % 10 == 0) {
                isValid = true;
            }
            /* Step 4: Get creditCard type. */
            creditCardType = this._getCardType(parsedCreditCard, creditCardArr.length);
        }
        
        return `${creditCardType}: ${creditCardRaw} (${isValid ? 'valid' : 'invalid'})`;
    }
}

let la = new LuhnAlgorithm();
let creditCardNum = '9111111111111111';
let result = la.checkCreditCard(creditCardNum);
console.log(result);