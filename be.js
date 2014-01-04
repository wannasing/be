/* 
* 创建时间：2014-01-03
* 创建人：berwin
* 用途：JS选择器
*/

(function(){
function getClass( oParent, oClass ){
    var arr = [];
    var aTag = oParent.getElementsByTagName( '*' );
    for( var i = 0; i < aTag.length; i++ ){
        var aClass = aTag[ i ].className.split( ' ' );
        if( findArr( aClass, oClass ) ){
            arr.push( aTag[ i ] );
        }
    }
    return arr;
}
function findArr( arr, n ){
    for( var i = 0; i < arr.length; i++ ){
        if( arr[ i ] === n ) return true;
    }
    return false;
}
function getEle( aParent, str ){
    var arr = [];
    for( var i = 0; i < aParent.length; i++ ){
        switch( str.charAt( 0 ) ){
            case '#':
                var obj = document.getElementById( str.substring( 1 ) );
                arr.push( obj );
            break;

            case '.':
                var aTag = getClass( aParent[ i ], str.substring( 1 ) );
                for( var j = 0; j < aTag.length; j++ ){
                    arr.push( aTag[ j ] );
                }
            break;

            default:

            if( /\w+\.[\w\-]+$/.test( str ) ){
                var aStr = str.split( '.' );
                var aTag = aParent[ i ].getElementsByTagName( aStr[ 0 ] );
                var re = new RegExp( '([^\\w\\-]|^)'+ aStr[ 1 ] +'([^\\w\\-]|$)' );
                for( var j = 0; j < aTag.length; j++ ){
                    if( re.test( aTag[ j ].className ) ){
                        arr.push( aTag[ j ] );
                    }
                }
            }else if( /^\w+#[\w\-]+$/.test( str ) ){
                var aStr = str.split( '#' );
                var aTag = aParent[ i ].getElementsByTagName( aStr[0] );
                for( var j = 0; j < aTag.length; j++ ){
                    if( aTag[ j ].id === aStr[ 1 ] ){
                        arr.push( aTag[ j ] );
                    }
                }
            }


            var aTag = aParent[ i ].getElementsByTagName( str );
            for( var j = 0; j < aTag.length; j++ ){
                arr.push( aTag[ j ] );
            }
            break;
        }
    }
    return arr;
}

window.be = function( str ){
    var arr = str.replace( /^\s+|\s+$/g, '' ).split( /\s+/ );
    var aChild = [];
    var aParent = [ document ];
    for( var i = 0; i < arr.length; i++ ){
        aChild = getEle( aParent, arr[ i ] );
        aParent = aChild;
    }
    return aChild;
}
})();