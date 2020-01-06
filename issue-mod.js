/*
SPDX-License-Identifier: Apache-2.0
*/

/*
 * This application has 6 basic steps:
 * 1. Select an identity from a wallet
 * 2. Connect to network gateway
 * 3. Access PaperNet network
 * 4. Construct request to issue commercial paper
 * 5. Submit transaction
 * 6. Process response
 */

'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const CommercialPaper = require('../contract/lib/paper.js');
const { askQuestions } = require('./ask');
const { askQuestions2} = require('./ask2');
const { askQuestions3} = require('./ask3');


// A wallet stores a collection of identities for use
//const wallet = new FileSystemWallet('../user/isabella/wallet');
const wallet = new FileSystemWallet('../identity/user/isabella/wallet');


// ***************** MY addition to original issue.js code. adding arraytest.js into the body of issue.js


askQuestions([
                'Is it an apparel or food item?',

])
    .then(answers => {
                if(answers[0]=== "food")
                {
                        askQuestions2   ([
                                                        'What is the digital twin id?',
                                                        'What is the item? ',
                                                        'What is the Brand? ',
                                                        'What is the production date? ',
                                                        'What is the Best by date ',
                                                        'What is the Expiration date? ',
                                                        'What is the Lot Quantity? ',
                                                        'What is the Supplier? ',
                                                        'What is the farm? ',
                                                        'what is the packaged location? ',

                                                        ])
                                                        .then(answers => {

                                                                farm = answers[8]
																//Just to check if the code was working. 
                                                                console.log("farm location is " + farm);
																
																
																
//grabbed this from the "original" asset and placed inside my if statement. 																
main().then(() => {

    console.log('Issue program complete.');

}).catch((e) => {

    console.log('Issue program exception.');
    console.log(e);
    console.log(e.stack);
    process.exit(-1);

}



                                }else if (answers[0] === "apparel"){

       askQuestions3   ([
                                                        'What is the digital twin id?',
                                                        'What is the item? ',
                                                        'What is the Brand? ',
                                                        'What is the color? ',
                                                        'What is the style? ',
                                                        'What is the Material? ',
                                                        'What is the Origin? ',
                                                        'What is the Season? ',


                                                        ])
                                                        .then(answers => {
                                                                console.log(answers[4]);

                                                                                         });

               }else {
                        console.log("sorry you did not select an appropriate asset type. Food or Apparel");


                }



     });


//end addition to original issue.js code.

// Main program function
async function main() {

    // A gateway defines the peers used to access Fabric networks
    const gateway = new Gateway();

    // Main try/catch block
    try {

        // Specify userName for network access
        // const userName = 'isabella.issuer@magnetocorp.com';
        const userName = 'User1@org1.example.com';

        // Load connection profile; will be used to locate a gateway
        let connectionProfile = yaml.safeLoad(fs.readFileSync('../gateway/networkConnection.yaml', 'utf8'));

        // Set connection options; identity and wallet
        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: { enabled:false, asLocalhost: true }
        };

        // Connect to gateway using application specified parameters
        console.log('Connect to Fabric gateway.');

        await gateway.connect(connectionProfile, connectionOptions);

        // Access PaperNet network
        console.log('Use network channel: mychannel.');

        const network = await gateway.getNetwork('mychannel');

        // Get addressability to commercial paper contract
        console.log('Use org.papernet.commercialpaper smart contract.');

        const contract = await network.getContract('papercontract');

        // issue commercial paper
        console.log('Submit commercial paper issue transaction.');

        const issueResponse = await contract.submitTransaction('issue', 'owner', 'id',' banana','brand name','today','tomorrow', 'next week', '1 box', 'foods','cannon','canada', 'Created');

        // process response
        console.log('Process issue transaction response.'+issueResponse);

        let paper = CommercialPaper.fromBuffer(issueResponse);

        console.log(`${paper.issuer} commercial paper : ${paper.paperNumber} successfully issued for item ${paper.itemName}`);
        console.log('Transaction complete.');

    } catch (error) {

        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);

    } finally {

        // Disconnect from the gateway
        console.log('Disconnect from Fabric gateway.');
        gateway.disconnect();

    }
}

/* commented out this piece, which is now placed in my if statement. 
 main().then(() => {

    console.log('Issue program complete.');

}).catch((e) => {

    console.log('Issue program exception.');
    console.log(e);
    console.log(e.stack);
    process.exit(-1);

});

*/

