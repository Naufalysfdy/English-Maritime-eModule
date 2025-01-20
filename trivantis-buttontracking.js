function ButtonTrackingObj(exp, titleName, cm, frame){
   this.VarTrivBtnTracking = new Variable( 'VarTrivBtnTracking', null, 0, cm, frame, exp, titleName, true );
   this.title = null;
}

ButtonTrackingObj.codeToStateMap =
{
	'N' : 'normalState',
	'O' : 'overState',
	'D' : 'downState',
	'A' : 'disabledState',
	'V' : 'visitedState',
	'S' : 'selectedState'
};
ButtonTrackingObj.stateToCodeMap = {};
for (var key in ButtonTrackingObj.codeToStateMap)
	ButtonTrackingObj.stateToCodeMap[ButtonTrackingObj.codeToStateMap[key]] = key;

ButtonTrackingObj.prototype.InitPageTracking = function ( )
{
	var THIS = this;
	var pageTrackData = this.VarTrivBtnTracking.getValue();
	var bDoInit = true;
	try {
	    if (pageTrackData && pageTrackData.length > 0 && pageTrackData != '~~~null~~~')
	    {
	        var topLevelSplit = pageTrackData.split('#');
	        if (topLevelSplit && topLevelSplit.length > 1)
            {
		        var arrIds = topLevelSplit[0].split(',');
		        var arrStatus = topLevelSplit[1].split(',');
		        for( var i=0; i<arrIds.length; i++ )
		        {
			        var id = parseInt( '0x' + arrIds[i] );
			        var status = arrStatus[i];
			        var node = this.FindNode( this.title, id );
			        if( node )
						node.v = ButtonTrackingObj.codeToStateMap[status] || status;
		        }
    		}
        }
    } catch (e) { }
}

ButtonTrackingObj.prototype.FindNode = function( node, id )
{
	if( node.id == id )
		return node;
	
	var match = null;
	if( typeof( node.c ) != 'undefined' ){
		for( var i=0; i<node.c.length; i++ ){
			match = this.FindNode( node.c[i], id );
			if( match != null )
				break;
		}
	}
	
	return match;
}

ButtonTrackingObj.prototype.InternalGetRangeStatus = function( node )
{
	if( node == null )
		return -1;
		
	if( typeof(node.c) == 'undefined' )
	{
		return node.v;
	}
	else
	{
		return 'normalState';
	}
}


ButtonTrackingObj.prototype.GetRangeStatus = function( id, bInit )
{
	var status = -1;
	if ( bInit ) 
		this.InitPageTracking();
	
	status = this.InternalGetRangeStatus( this.FindNode( this.title, id ) );

	return status;
}


ButtonTrackingObj.prototype.InternalSetRangeStatus=function( node, status )
{
	if( node == null )
		return;
	node.v = status;
	if( status == 0 && typeof(node.c)!='undefined')
	{
		for( var i=0; i<node.c.length; i++ )
			this.InternalSetRangeStatus( node.c[i], status ); 
	}
}

ButtonTrackingObj.prototype.SetRangeStatus = function( id, status /*0 or 1 or 2*/)
{
	this.InternalSetRangeStatus( this.FindNode(this.title, id), status );
	
	this.SavePageTracking();
}

ButtonTrackingObj.prototype.IterateTree = function( func )
{
	var stack = [];
	stack.push( this.title );
	var i = 0;
	while( stack.length > 0 )
	{
		var node = stack.shift();
		
		if( typeof(node.c) != 'undefined' )
			stack = node.c.concat(stack);
			
		//do the thing
		func( node, i, stack );
		i++;
	}	
}

ButtonTrackingObj.prototype.SavePageTracking = function()
{
	var fnIsSaveState = window.ObjButton && ObjButton.isSaveState || function () { return false; };
	var hexString = '';
	var arrayIds = [];
	var arrayStatus= [];
	
	this.IterateTree(function(node, i, stack){
		if (fnIsSaveState(node.v))
		{
			arrayIds.push(node.id);
			arrayStatus.push(node.v);
		}
	});
	
	for( var i=0; i<arrayIds.length; i++ )
		hexString += (i > 0 ? ',' : '') + arrayIds[i].toString(16);

	hexString += (arrayIds.length > 0 ? '#' : '');
	
	for (var i = 0; i < arrayStatus.length; i++)
		hexString += (i > 0 ? ',' : '') + (ButtonTrackingObj.stateToCodeMap[arrayStatus[i]] || arrayStatus[i]);

	//LD-8267 - Added a condition to avoid tracking null/empty data unnecessarily
	if (hexString.length > 0 || (myTop.suspendDataCache && myTop.suspendDataCache.indexOf('VarTrivBtnTracking') >= 0) || !this.VarTrivBtnTracking.bSCORM)
		this.VarTrivBtnTracking.set(hexString);
}

var trivBtnTracking = new ButtonTrackingObj(365,'e_module_maritime_english', 0, null);
trivBtnTracking.title={id:1,v:0,c:[{id:339920,v:'normalState'},{id:205536,v:'normalState'},{id:336637,v:'normalState'},{id:337485,v:'normalState'},{id:339513,v:'normalState'},{id:160144,v:'normalState'},{id:407416,v:'normalState'},{id:407424,v:'normalState'},{id:395439,v:'normalState'},{id:399075,v:'normalState'},{id:399147,v:'normalState'},{id:407600,v:'normalState'},{id:423833,v:'normalState'},{id:407862,v:'normalState'},{id:398091,v:'normalState'},{id:408124,v:'normalState'},{id:408387,v:'normalState'},{id:408396,v:'normalState'},{id:408799,v:'normalState'},{id:409533,v:'normalState'},{id:409918,v:'normalState'},{id:409927,v:'normalState'},{id:168524,v:'normalState'},{id:168538,v:'normalState'},{id:410122,v:'normalState'},{id:359906,v:'normalState'},{id:359919,v:'normalState'},{id:178724,v:'normalState'},{id:178750,v:'normalState'},{id:369987,v:'normalState'},{id:213912,v:'normalState'},{id:209221,v:'normalState'},{id:214777,v:'normalState'},{id:400478,v:'normalState'},{id:410390,v:'normalState'},{id:410669,v:'normalState'},{id:410920,v:'normalState'},{id:216019,v:'normalState'},{id:411284,v:'normalState'},{id:411752,v:'normalState'},{id:411761,v:'normalState'},{id:412314,v:'normalState'},{id:412323,v:'normalState'},{id:412620,v:'normalState'},{id:412629,v:'normalState'},{id:412721,v:'normalState'},{id:412730,v:'normalState'},{id:412872,v:'normalState'},{id:412881,v:'normalState'},{id:412930,v:'normalState'},{id:412939,v:'normalState'},{id:413056,v:'normalState'},{id:413065,v:'normalState'},{id:413107,v:'normalState'},{id:368052,v:'normalState'},{id:413292,v:'normalState'},{id:413372,v:'normalState'},{id:413381,v:'normalState'},{id:413423,v:'normalState'},{id:413432,v:'normalState'},{id:413475,v:'normalState'},{id:413484,v:'normalState'},{id:413639,v:'normalState'},{id:413648,v:'normalState'},{id:413691,v:'normalState'},{id:413700,v:'normalState'},{id:413754,v:'normalState'},{id:419688,v:'normalState'},{id:413796,v:'normalState'},{id:413805,v:'normalState'},{id:413854,v:'normalState'},{id:289136,v:'normalState'},{id:425370,v:'normalState'},{id:289149,v:'normalState'},{id:289162,v:'normalState'},{id:301651,v:'normalState'},{id:378773,v:'normalState'},{id:378756,v:'normalState'},{id:378743,v:'normalState'},{id:389260,v:'normalState'},{id:389279,v:'normalState'},{id:389292,v:'normalState'},{id:389305,v:'normalState'},{id:389841,v:'normalState'},{id:389860,v:'normalState'},{id:389873,v:'normalState'},{id:389886,v:'normalState'},{id:390249,v:'normalState'},{id:390268,v:'normalState'},{id:390281,v:'normalState'},{id:390294,v:'normalState'},{id:390322,v:'normalState'},{id:390341,v:'normalState'},{id:390354,v:'normalState'},{id:390367,v:'normalState'},{id:381542,v:'normalState'},{id:381555,v:'normalState'},{id:381568,v:'normalState'}]};
