export default class CurrencyFormatter
{

    formatter;
    cents = true;

    // cents = false;

    constructor(cents = true)
    {
        this.cents = cents;
        this.formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
    }

    format(num)
    {
        if (this.cents)
        {
            num = num / 100;
        }
        return this.formatter.format(num);
    }
}