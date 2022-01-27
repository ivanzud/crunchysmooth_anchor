const assert = require("assert");
const anchor = require("@project-serum/anchor");

describe("crunchy-vs-smooth", () => {
  // Configure the client
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.CrunchyVsSmooth;

  let voteAccount, voteAccountBump;
  before(async () => {
    [voteAccount, voteAccountBump] =
      await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from("vote_account")],
        program.programId
      );
  });

  it("Initializes with 0 votes for crunchy, middle, smooth", async () => {
    await program.rpc.initialize(new anchor.BN(voteAccountBump), {
      accounts: {
        user: provider.wallet.publicKey,
        voteAccount: voteAccount,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
    });

    let currentVoteAccountState = await program.account.votingState.fetch(
      voteAccount
    );
    assert.equal(0, currentVoteAccountState.counter.toNumber());
  });


  it("connect Discord", async () => {
    await program.rpc.connDiscord({
      accounts: {
        voteAccount: voteAccount,
      },
    });

    let currentVoteAccountState = await program.account.votingState.fetch(
      voteAccount
    );
    assert.equal(200, currentVoteAccountState.counter.toNumber());

  });

  it("follow twitter", async () => {
    await program.rpc.followTwitter({
      accounts: {
        voteAccount: voteAccount,
      },
    });

    let currentVoteAccountState = await program.account.votingState.fetch(
      voteAccount
    );
    assert.equal(550, currentVoteAccountState.counter.toNumber());

  });


  // it("follow twitter", async () => {
  //   await program.rpc.followTwitter({
  //     accounts: {
  //       voteAccount: voteAccount,
  //     },
  //   });

  //   let currentVoteAccountState = await program.account.votingState.fetch(
  //     voteAccount
  //   );
  //   assert.equal(550, currentVoteAccountState.counter.toNumber());

  // });

  it("retweet tweet", async () => {
    await program.rpc.retweetTweet({
      accounts: {
        voteAccount: voteAccount,
      },
    });

    let currentVoteAccountState = await program.account.votingState.fetch(
      voteAccount
    );
    assert.equal(800, currentVoteAccountState.counter.toNumber());
  });
});
