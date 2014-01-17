beJs
=============
######这是一个选择器，你可以像CSS一样的去选择元素

它支持CSS2以及CSS3的所有语法，什么？你还不会CSS3？？那你只能玩它最基本的选择方式了。

-------------

####语法说明：be( '这里与CSS一样' );  返回类型 [ Array ]

#####基本选择器

######be( 'element' );

根据给定的元素名匹配所有元素

    be( 'div' );  // 选择所有 div 元素


######.be( 'class' );

根据给定的 class 匹配元素。

    be( '.div' );  // 选择所有 class 为 'div' 的元素
    be( '.div.d' );  // 选择所有 class 为 'div d' 的元素
    be( 'li.active' );  // 选择所有 li 的 class 为 'active' 的元素

    
######be( 'id' );

根据给定的ID匹配一个元素。

    be( '#id' );  // 选择 id 为 'id' 的元素


######be( 'element.class' );

    be( 'div.box' );  // 选择所有 class 为 'box' 的 div


######be( 'element#id' );

    be( 'li#list' );  // 选择所有 id 为 'list' 的 li


#####层级选择器

######be( 'ancestor descendant' );

在给定的祖先元素下匹配所有的后代元素

    be( 'ul li' );  // 选择所有 ul 下的 li

    be( '.box h4' );  // 选择所有 class 为 'box' 下的 h4

    be( '#box div' );  // 选择 id 为 'box' 下的所有 div


######be( 'parent > child' );

在给定的父元素下匹配所有的子元素

    be( 'ul > li' );  //选择所有 ul 下的 li

    be( '.box > div' )  //选取所有 class 为 'box' 的元素下的 div 元素

    be( '#box > div' )  //选取所有 id 为 'box' 的元素下的 div 元素



#####属性选择器

[attribute=value] 匹配给定的属性是某个特定值的元素

attribute => 属性名

value => 属性值

中间不能加空格

    be( 'input[type=button]' );  // 查找所有 type 属性是 button 的 input 元素


#####伪类选择器


:first 获取第一个元素

    be( ' li:first  ' );  // 选择第一个 li 元素

:last 获取最后一个元素

    be( ' li:last  ' );  // 选择最后一个 li 元素

:even 匹配所有索引值为偶数的元素，从 0 开始计数

    be( ' li:even  ' );  // 选择所有 li 的1、3、5...行（即索引值0、2、4...）

:odd 匹配所有索引值为奇数的元素，从 0 开始计数

    be( ' li:eq(2)  ' );  // 选择所有 li 的2、4、6行（即索引值1、3、5...）

:header 匹配如 h1, h2, h3之类的标题元素

    be( 'div:header' ); // 选择所有 div 下的所有标题

