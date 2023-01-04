const Voting = artifacts.require("Voting");


let _voting = {
	"winner": 0,
	"one": 1,
	"two": 2,
	"three": 3
}



contract("Voting", (accounts) => {
    before(async () => {
        let started = true;
        instance = await Voting.deployed()
    })

    //Test case one
    it( " Adding Candidate for election" , async () => {
        await instance.addCandidate(accounts[1],"19","Olamide","Myphoto","Ifps_file", {from: accounts[0]}).then(function (result) {
        assert.equal(true, result.receipt.status, "Make sure all details were provided")
    })
//test case two
    })
    it("get Number of Candidate ", async ()=> {
       await instance.getCandidateLength.call().then(function (result) {
        assert.equal("0x01", result.toNumber(), 'Invalid candidate address was provided'); 
    })
  })
// //test case three

it("Give Voting right positive testing", async() => {
    await instance.voteRight(accounts[1], "Titi","image","ipfs",18).then(function (result) {
      assert.equal("0x01", result.receipt.status, 'You are underage');
    })
})


//test case four

it("Getting the number of voter", async() => {
  await instance.getVoterLength.call().then(function(result) {
    assert.equal("0x01", result.toNumber(), "No voters");
  })
})

//test case five 
it("Getting the voters details", async() => {
  await instance.getVoterDetails(accounts[1]).then(function(result) {
    assert.equal({}, result.toString(), "No voters details");
  })
})

//test case six 
it("Getting the list of voted voter", async() => {
  await instance.getVotedVoterList.call().then(function(result) {
    assert.equal([], result.toString(), "No voters voted list");
  })
})

//test case seven

it("Getting the list of voter", async() => {
  await instance.getVoterList.call().then(function(result) {
    assert.equal(accounts[1], result.toString(), "No voters list");
  })
})

//test case eight 
it("Checking if polls is opened for voting Valid votes", async() => {
  let started = "0x01";
  await instance.vote(accounts[1], 1,{from :started, value: "0x01"}).then(function (result) {
    assert.equal('0x01', result.toString(), 'Voting is done');
  })
})
  
//test case one Negative testing

it("Give Voting right positive testing", async() => {
  await instance.voteRight(accounts[1], "Titi","image","ipfs",17).then(function (result) {
    assert.equal("0x01", result.receipt.status, 'You are underage');
  });
});
})

