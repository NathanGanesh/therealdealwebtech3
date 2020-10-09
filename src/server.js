import * as sapper from "@sapper/server"
import compression from 'compression';
import sirv from 'sirv'

const { PORT, NODE_ENV } = process.env;
import init from './server/index.js'
const dev = NODE_ENV === "development";
// const authRoute = require('./REST/auth.js');
// const auctionRoute = require('./REST/auction.js');
// const bidRoute = require('./REST/bid.js');
// const registerRoute = require('./REST/user.js');
const app = init();

app
	.use(
		compression({ threshold: 0 }),
		sirv('static', {dev}),
		sapper.middleware()
	).listen(PORT, err => {
	if (err) console.log('error', err);
})

