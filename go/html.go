package main

// To keep it simple, no html/template but only plain HTML.
var (
	html map[string]string = map[string]string{
		"home": `<!doctype html>
<html lang='en'>
    <head>
        <meta charset='utf-8'>
        <title>Rapyd Checkout Demo</title>
    </head>
    <body>
        <header>
            <h1>Rapyd Checkout Demo</h1>
        </header>
		<main>
			<form action='/checkout' method='POST'>
				<div>
					<h2>Buy woolen socks</h2>
				</div>
				<div>
					<label>Number of items:</label>
					<input type='text' name='count' value='1'>
				</div> 
				<input type='submit' value='Continue to checkout'> </div>
			</form>
		</main>
    </body>
</html>`,
		"complete": `<!doctype html>
<html lang='en'>
    <head>
        <meta charset='utf-8'>
        <title>Rapyd Checkout Demo</title>
    </head>
    <body>
        <header>
            <h1>Rapyd Checkout Demo</h1>
        </header>
        <nav>
            <a href='/'>Home</a>
        </nav>
        <main>
			<h2>Checkout complete</h2>
        </main>
    </body>
</html>`,
		"cancel": `<!doctype html>
<html lang='en'>
    <head>
        <meta charset='utf-8'>
        <title>Rapyd Checkout Demo</title>
    </head>
    <body>
        <header>
            <h1>Rapyd Checkout Demo</h1>
        </header>
        <nav>
            <a href='/'>Home</a>
        </nav>
        <main>
			<h2>Checkout canceled</h2>
        </main>
    </body>
</html>`,
	}
)
