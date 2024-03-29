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
                if( /#\w+>\w+/.test( str ) ){
                    var aStr = str.match( /\w+/g );
                    var obj = document.getElementById( aStr[0] );
                    var aC = obj.children;
                    for( var j = 0; j < aC.length; j++ ){
                        if( aC[ j ].tagName.toLowerCase() === aStr[1] ){
                            arr.push( aC[ j ] );
                        }
                    }
                }else{
                    var obj = document.getElementById( str.substring( 1 ) );
                    arr.push( obj );
                }
            break;

            case '.':
                if( /^(\.[\w\-]+\.[\w\-]+)$/.test( str ) ){
                    var aStr = str.match( /[\w\-]+/g );
                    var aC = [];
                    aC = getClass( aParent[ i ], aStr[ 0 ] );
                    for( var j = 0; j < aC.length; j++ ){
                        if( findArr( aC[ j ].className.split( ' ' ), aStr[1] ) ){
                            arr.push( aC[ j ] );
                        }
                    }
                }else if( /^\.[\w\-]+#[\w\-]+$/.test( str ) ){
                    var aStr = str.match( /[\w\-]+/g );
                    var aC = getClass( aParent[i], aStr[0] );
                    for( var j = 0; j < aC.length; j++ ){
                        if( aC[ j ].id === aStr[1] ){
                            arr.push( aC[ j ] );
                        }
                    }
                }else if( /^\.\w+>\w+/.test( str ) ){
                    var aStr = str.match( /\w+/g );
                    var aTag = getClass( aParent[i], aStr[0] );
                    for( var j = 0; j < aTag.length; j++ ){
                        var aC = aTag[ j ].children;
                        for( var n = 0; n < aC.length; n++ ){
                            if( aC[ n ].tagName.toLowerCase() === aStr[ 1 ] ){
                                arr.push( aC[ n ] );
                            }
                        }
                    }
                }else{
                    var aTag = getClass( aParent[ i ], str.substring(1) );
                    for( var j = 0; j < aTag.length; j++ ){
                        arr.push( aTag[ j ] );
                    }
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
            }else if( /^\w+\[\w+=.+\]$/.test( str ) ){
                var aStr = str.split( '[' );
                aStr[ 1 ] = aStr[ 1 ].substring( 0, aStr[ 1 ].length - 1 );
                var aTag = aParent[ i ].getElementsByTagName( aStr[0] );
                var aStr2 = aStr[1].split( '=' );
                for( var j = 0; j < aTag.length; j++ ){
                    if( aTag[ j ].getAttribute( aStr2[0] ) === aStr2[1] ){
                        arr.push( aTag[ j ] );
                    }
                }
            }else if( /^\w+:\w+(\-\w+|\(.+\))?$/.test( str ) ){
                var aStr = str.split( ':' );
                var aTag = aParent[i].getElementsByTagName( aStr[0] );
                var aStr2 = aStr[1].split( '(' );
                if( aStr2[1] ){
                    aStr2[1] = aStr2[1].substring( 0, aStr2[1].length - 1 );
                }

                switch( aStr2[0] ){
                    case 'first':
                        arr.push( aTag[0] );
                    break;

                    case 'last':
                        arr.push( aTag[ aTag.length - 1 ] );
                    break;

                    case 'eq':
                        arr.push( aTag[ aStr2[1] ] );
                    break;

                    case 'even':
                        for( var j = 0; j < aTag.length; j++ ){
                            if( j % 2 === 0 ){
                                arr.push( aTag[ j ] );
                            }
                        }
                    break;

                    case 'odd':
                        for( var j = 0; j < aTag.length; j++ ){
                            if( j % 2 !== 0 ){
                                arr.push( aTag[ j ] );
                            }
                        }
                    break;

                    case 'header':
                        var aH = [];
                        for( var j = 0; j < aTag.length; j++ ){
                            for( var l = 1; l < 7; l++ ){
                                aH.push( aTag[ j ].getElementsByTagName( 'h'+l ) );
                            }
                            for( var k = 0; k < aH.length; k++ ){
                                if( aH[ k ].length ){
                                    for( var m = 0; m < aH[k].length; m++ ){
                                        arr.push( aH[k][m] );
                                    }
                                }
                            }
                        }
                    break;
                }
            }else if( /^\w+>\w+$/.test( str ) ){
                var aStr = str.split( '>' );
                var aTag = aParent[ i ].getElementsByTagName( aStr[ 0 ] );
                for( var j = 0; j < aTag.length; j++ ){
                    var aC = aTag[ j ].children;
                    for( var n = 0; n < aC.length; n++ ){
                        if( aC[ n ].tagName.toLowerCase() === aStr[ 1 ] ){
                            arr.push( aC[ n ] );
                        }
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
    if( str.indexOf( '>' ) != -1 ){
        var arr = [ str.replace( /\s+/g, '' ) ];
    }else{
        var arr = str.replace( /^\s+|\s+$/g, '' ).split( /\s+/ );
    }
    var aChild = [];
    var aParent = [ document ];
    for( var i = 0; i < arr.length; i++ ){
        aChild = getEle( aParent, arr[ i ] );
        aParent = aChild;
    }
    return aChild;
}
})();