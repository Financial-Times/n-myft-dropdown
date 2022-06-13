import express from 'express';
import cookieParser from 'cookie-parser';
import { PageKitHandlebars } from '@financial-times/dotcom-server-handlebars/dist/node/PageKitHandlebars';

const app = express();
app.use(cookieParser());
app.use('/public', express.static(__dirname + '/public'));
app.set('views', __dirname + '/templates');
app.set('view engine', 'html');

const renderer = new PageKitHandlebars();
app.engine('html', renderer.engine);

app.get('/', (req, res) => {
	return res.render('index', { layout: 'custom-vanilla', title: 'Demo' });
});

module.exports = app;
