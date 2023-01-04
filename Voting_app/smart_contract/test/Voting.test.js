const Voting = artifacts.require("Voting");


let _voting = {
	"winner": 0,
	"one": 1,
	"two": 2,
	"three": 3
}


contract("Voting", (accounts) => {
    before(async () => {
        instance = await Voting.deployed()
    })

    //Test case one
    it( " Adding Candidate for election" , async () => {
        await instance.addCandidate([web3.utils.asciiToHex("olamide")]).then(function (result) {
        assert.equal(true, result.receipt.status, "The candidate ID should be in bytes32")
    })
//test case two
    })
    it("Register valid voters", async ()=> {
       await instance.giveRightToVote(accounts[1], { from: accounts[0]}).then(function (result) {
        assert.equal('0x01', result.receipt.status, 'Registration is valid'); 
    })
    })
//test case three

it("Valid votes", async() => {
    await instance.vote(_voting.winner, {from: accounts[0]}).then(function (result) {
      assert.equal('0x01', result.receipt.status, 'Voting is done');
    })
})
    // test case four
it("Validate winner", async ()=> {
    await instance.winningCandidate.call().then(function (result) {
      assert.equal(_voting.winner, result.toNumber(), 'Winner is validated with the expected winner');
    });
  });

  //test case five
  it("Election Status When Started", async () => {
    await instance.getStatus.call().then(function (started) {
      started = false
      assert(started !== true, 'Election has not started');
    });
  });
//test case six
  it("Election Status When Ended", async () => {
    await instance.endElection.call().then(function (ended) {
        ended = false
        assert(ended !== true, 'Voting  In Progress at the moment ');
    });
  });

})
