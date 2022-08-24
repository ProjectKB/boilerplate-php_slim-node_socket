<?php

use Slim\Factory\AppFactory;
use Slim\Views\Twig;
use Slim\Views\TwigMiddleware;
use ElephantIO\Client;


require __DIR__ . '/../vendor/autoload.php';

// Create App
$app = AppFactory::create();

// Create Twig
$twig = Twig::create('../templates', ['cache' => false]);

// Add Twig-View Middleware
$app->add(TwigMiddleware::create($app, $twig));


$app->get('/', function ($request, $response, $args) {
    $view = Twig::fromRequest($request);

    return $view->render($response, 'index.html.twig');
});

$app->get('/connect', function ($request, $response, $args) {
    $view = Twig::fromRequest($request);

    $url = 'http://localhost:3001';
    $client = new Client(Client::engine(Client::CLIENT_4X, $url));
    $client->initialize();

    // emit an event to the server
    $data = ['username' => 'my-user'];
    $client->emit('new_order', $data);
    $client->close();

    return $view->render($response, 'connect.html.twig');
});

$app->get('/disconnect', function ($request, $response, $args) {
    $view = Twig::fromRequest($request);

    return $view->render($response, 'disconnect.html.twig');
});

// Run app
$app->run();