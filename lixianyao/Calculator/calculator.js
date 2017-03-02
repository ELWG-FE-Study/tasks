var Btns;
var Inputs, inputlen = 0;
var Screen;
var Dot=false, PreIsOp = true;
var Oper = '+';
var LastRes = 0;
var PreIsRes = true;

//��������ʱ��ʼ��
window.onload =  myfun;

function myfun()
{
	Screen = document.getElementById("screen");

	//��ʼ��ʾ�����󶨰�ť�¼�
	initInput();
	screenChanged();
	initBtns();
}

//��ʼ������������Ļ��ʾ��
function initInput()
{
    Inputs = 0;
    Dot = false;
}

function screenChanged()
{
	Screen.value=Inputs;
}

//Ϊ���еİ��������ʼ�����ԡ��¼�
function initBtns()
{
	try{
	Btns = document.getElementsByTagName("button");
	var len = Btns.length;

	//����button����
	for(var i =0; i< len ; i++)
	{
		Btns[i].onmouseover = function(){ BtnHover(this,true)};
		Btns[i].onmouseout =function(){  BtnHover(this,false)};
		Btns[i].onclick = function(){ BtnPressed(this)};
	}
	}
	catch(err)
	{
		var txt="";
		alert(err.message);
	}
	
}

function BtnHover(btn,flag)
{try{
	if(flag == true)
	{	btn.style.fontSize = "25px";}
	else
	{	btn.style.fontSize = "40px";}
	}
	catch(err)
	{
		var txt="";
		alert(err.message);
	}
}

function BtnPressed(btn)
{
	try{
	    if(btn.value == "function")
	    {
		    switch(btn.name)
		    {
		        case "AC":
		            PreIsOp = false;
		            initInput();
		            Oper = "+";
		            LastRes = 0;
				    screenChanged();
				    break;

		        case "%"://�ٷ����������������ֱ�ӽ���ǰ����������100
		            if (PreIsOp == true) {
		                alert("�﷨����");
		                break;
		            }
		            PreIsOp = false;
		            Inputs = parseFloat(Inputs);
		            Inputs /=100;
				    if(Inputs<0)  
				        Dot = true;

                    //����ֱ��ת�������������֮ǰ���ۻ����
				    if (PreIsRes == true)
				    {
				        LastRes = 0; Oper = "+";
				    }
				    PreIsRes = true;
                  
				    Screen.value = LastRes + Oper + Inputs;
				    break;

		        case ".":
		            PreIsOp = false;
		            if (Dot == true) {
		                alert("�Ƿ���С����");
		                break;
		            }
		            Dot = true;
		            Inputs = Inputs + ".";
		            PreIsRes = false;
		            Screen.value = LastRes + Oper + Inputs;
				    break;

		        case "=":
		            if (PreIsOp == true)
		            {
		                alert("�﷨����ȱ�ٲ�����2");
		                break;
		            }
		            changeRes(Oper);
		            break;

		        default:
		            getOper(btn.name);
		            break;
		    }
	    }
	    //����Ϊ��ֵ
	    else
	    {
	        
	        if (PreIsRes == true)//δ��ǰ����������ʹ�������������һ���µ�����
	        {
	            PreIsRes = false;
	            LastRes = 0;
	            initInput();
	        }

	        PreIsOp = false;
		    if(Dot==false)//����ֱ���ۼ�β��
		    {
		        Inputs = Inputs * 10 + btn.name * 1;
		    }
		    else//С����������Ҫע�ⳤ��
		    {
			    Inputs += btn.name;
		    }
		    Screen.value = LastRes + Oper + Inputs;
		   // screenChanged();
	    }
	}
	catch(err)
	{
		var txt="";
		alert(err.message);
	}
}

function getOper(op) {
    //��ǰһ������Ҳ��opʱ���������ֻ�Ǽ򵥵��滻�����
    //���ǽ�����һ���������ֱ�ӽ���ȥ
    if (PreIsOp == true || PreIsRes == true) {
        Oper = op;
    }
    //���򣬰�ԭ����ǰһ��������������뵱ǰ���������㣬�ټ��µ�ǰ�����
    else {
        changeRes(Oper);
    }
    
    //�����������ĺϷ�����
    Oper = op;
    //��ǰ�����Ϊ������1
    LastRes = Inputs;
    //��ʾ
    Screen.value = LastRes + op;
    PreIsOp = true;
    PreIsRes = false;
    initInput();
}

function changeRes(op) {

    Inputs = parseFloat(Inputs);
    if (isInt(Inputs) && isInt(LastRes)) {
        Inputs = Inputs.toString();
        Inputs = parseInt(Inputs);
    }
    else LastRes = parseFloat(LastRes);
 
    switch (op) {
        case '+':
            LastRes = LastRes + Inputs;
            break;
        case '-':
            LastRes = LastRes - Inputs;
            break;
        case '*':
            LastRes = LastRes * Inputs;
            break;
        case '/':
            LastRes = LastRes / Inputs;
            break;
    }

    //Ϊ�˲鿴���������λ��
    if (!isInt(LastRes)) {
        Dot = true;
        LastRes = LastRes.toFixed(5);
    }
    else Dot = false;

    Inputs = LastRes;
    PreIsRes = true;
    PreIsOp = false;
    screenChanged();
}

function isInt(n) {
    return typeof n === 'number' && parseFloat(n) == parseInt(n, 10) && !isNaN(n);
}