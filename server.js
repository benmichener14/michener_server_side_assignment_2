var http = require('http');
var server = http.createServer(requestHandler); 
server.listen(process.env.PORT, process.env.IP, startHandler);

function startHandler()
{
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
}

function requestHandler(req, res) 
{
  try
  {
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    res.writeHead(200, {'Content-Type': 'application/json'});
    
    if (query['cmd'] == undefined)
      throw Error("A command must be specified");
      
    var result = {};
    if (query['cmd'] == 'CalcCharge')
    {
      validate(query);
      result = calcCharge(query);
    }
    else
    {
      throw Error("Invalid command: " + query['cmd']);
    }
 
    res.write(JSON.stringify(result));
    res.end('');
  }
  catch (e)
  {
    var error = {'error' : e.message};
    res.write(JSON.stringify(error));
    res.end('');
  }
}

function calcCharge(query)
{
    var checking = parseFloat(query["checkBal"]);
    var savings = parseFloat(query["savingsBal"]);
    var checks = parseFloat(query["checks"]);
    var charge = 0;
    
    if(!(checking > 1000 || savings > 1500))
    {
      charge = .15 * checks;
      
    }
    
    return {'charge': charge};
}

function validate(query)
{
  //Check that the query is correct
    if(query['checkBal'] == undefined)
    {
      throw Error("Please specify checkBal");
    }
    if(isNaN(query['checkBal']))
    {
      throw Error("Invalid value for checkBal");
    }
    if(query['checkBal'] < 0)
    {
      throw Error("Get a Job");
    }
    if(query['savingsBal'] == undefined)
    {
      throw Error("Please specify savingsBal");
    }
    if(isNaN(query['savingsBal']))
    {
      throw Error("Invalid value for savingsBal");
    }
    if(query['savingsBal'] < 0)
    {
      throw Error("Save some money");
    }
    if(query['checks'] == undefined)
    {
      throw Error("Please specify checks");
    }
    if(isNaN(query['checks']))
    {
      throw Error("Invalid value for checks");
    }
    if(query['checks'] < 0)
    {
      throw Error("Learn to count");
    }
    
    //End Check
}