{
"expo": {
...
"plugins": [
[
"@stripe/stripe-react-native",
{
"merchantIdentifier": string | string [],
"enableGooglePay": boolean
}
]
],
}
}

merchantIdentifier: iOS only. This is the Apple merchant ID obtained here. Otherwise, Apple Pay will not work as expected. If you have multiple merchantIdentifiers, you can set them in an array.
enableGooglePay: Android only. Boolean indicating whether or not Google Pay is enabled. Defaults to false.
