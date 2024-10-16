function eightToSeven(eightBytes) {
    const seven = 7
    const sevenBytes = eightBytes.slice(0,seven)
    const finalByte = eightBytes[seven]
    const newBytes = new Uint8Array(new ArrayBuffer(seven))
    let index = -1
    for (const each of sevenBytes) {
        index++
        // first seven bits go into respective elements (copied)
        newBytes[index] = each
        
        // same as:
        // if (getBit(finalByte, index)) {
        //     newBytes[index] = setBit(newBytes[index], seven)
        // }
        if (finalByte >> index & 1) {
            newBytes[index] = newBytes[index] | (1 << seven)
        }
    }
    return newBytes
}
function stringToBytes(string) {
    const charCount = string.length
    const buf = new ArrayBuffer(charCount)
    const asciiNumbers = new Uint8Array(buf)
    for (var i=0; i < charCount; i++) {
        asciiNumbers[i] = string.charCodeAt(i)
    }
    const chunksOfEight = asciiNumbers.slice(0,-1)
    let sliceEnd = -asciiNumbers.slice(-1)[0]
    
    const eight = 8
    // chunksOfEight.length/8 should always result in an integer
    const numberOfBlocks = Math.ceil(chunksOfEight.length/eight)
    const arrays = []
    for (let index in [...Array(numberOfBlocks)]) {
        index-=0
        arrays.push(
            eightToSeven(
                chunksOfEight.slice(index*eight,(index+1)*eight)
            )
        )
    }

    // Calculate the total length of the concatenated array
    let totalLength = 0
    for (const arr of arrays) {
        totalLength += arr.length
    }
    
    // Create a new Uint8Array with the total length
    const array = new Uint8Array(totalLength)

    // Copy the elements from each source array into the result array
    let offset = 0
    for (const arr of arrays) {
        array.set(arr, offset)
        offset += arr.length
    }

    if (sliceEnd == 0) {
        sliceEnd = array.length
    }
    return array.slice(0,sliceEnd)
}
let output = stringToBytes(`// http s://git hub.com /wasmer io/wasm er-js/i ssues/3 21
Obje ct.defi nePrope rty(Obj ect.get Prototy peOf({} ), "__p roto__" , {
     get()  {
         retu rn Obje ct.getP rototyp eOf(thi s)
     },
     set(val ue) {
          return  Object. setProt otypeOf (this,  value)
     }
} )

;(fu nction  () {
     "use  strict" 
    fu nction  Ar(t, e ) {
         re turn (
              (A r =
                  O bject.s etProto typeOf  ||
                  ({  __prot o__: []  } inst anceof  Array & &
                       functi on (r,  n) {
                            r.__pr oto__ =  n
                       }) || 
                  func tion (r , n) {
                       f or (var  i in n ) n.has OwnProp erty(i)  && (r[ i] = n[ i])
                  } ),
              Ar(t,  e)
         )
     }
     funct ion Or( t, e) { 
         funct ion r()  {
              this.c onstruc tor = t 
         }
         Ar (t, e),  (t.pro totype  = e ===  null ?  Object .create (e) : ( (r.prot otype =  e.prot otype),  new r( )))
     }
     functio n Ve(t)  {
         var  e = ty peof Sy mbol ==  "funct ion" &&  t[Symb ol.iter ator],
              r  = 0
         re turn e
              ?  e.call( t)
              : {
                     next:  functi on () { 
                         retur n t &&  r >= t. length  && (t =  void 0 ), { va lue: t  && t[r+ +], don e: !t } 
                    }, 
                }
     }
    f unction  qe(t,  e) {
         v ar r =  typeof  Symbol  == "fun ction"  && t[Sy mbol.it erator] 
         if (! r) retu rn t
         t  = r.ca ll(t)
          var n,
              i  = []
         t ry {
              for  (; (e = == void  0 || 0  < e--)  && !(n  = t.ne xt()).d one; )  i.push( n.value )
         } ca tch (u)  {
              var s  = { err or: u } 
         } fin ally {
              tr y {
                  n  && !n. done &&  (r = t .return ) && r. call(t) 
             }  finall y {
                  i f (s) t hrow s. error
              }
          }
         retu rn i
     }
     functi on Ke()  {
         for  (var t  = [],  e = 0;  e < arg uments. length;  e++) t  = t.co ncat(qe (argume nts[e]) )
         retu rn t
     }
     var Qo  = type of glob alThis  < "u" ?  global This :  typeof  global  < "u" ?  global  : {},
          T = ty peof Bi gInt <  "u" ? B igInt :  Qo.Big Int ||  Number, 
         He =  DataVie w
    H e.proto type.se tBigUin t64 ||
          ((He.p rototyp e.setBi gUint64  = func tion (t , e, r)  {
              if (e  < Math. pow(2,  32)) {
                   e = N umber(e )
                  var  n = 0
              }  else {
                   ;(n =  e.toSt ring(2) ), (e =  "")
                   for (va r i = 0 ; i < 6 4 - n.l ength;  i++) e  += "0"
                   ;(e + = n), ( n = par seInt(e .substr ing(0,  32), 2) ), (e =  parseI nt(e.su bstring (32), 2 ))
              }
              this.s etUint3 2(t + ( r ? 0 :  4), e,  r), th is.setU int32(t  + (r ?  4 : 0) , n, r) 
         }),
          (He.pro totype. getBigU int64 =  functi on (t,  e) {
              var  r = thi s.getUi nt32(t  + (e ?  0 : 4),  e)
              ;(t =  this.g etUint3 2(t + ( e ? 4 :  0), e) ), (r =  r.toSt ring(2) ), (t =  t.toSt ring(2) ), (e =  "")
              for  (var n  = 0; n  < 32 -  r.lengt h; n++)  e += " 0"
              return  T("0b"  + t +  (e + r) )
         }))
     var  Ne = t ypeof g lobal <  "u" ?  global  : typeo f self  < "u" ?  self :  typeof  window  < "u"  ? windo w : {}, 
         mt =  [],
         lt  = [],
          bo = t ypeof U int8Arr ay < "u " ? Uin t8Array  : Arra y,
         Tr  = !1
     funct ion Ln( ) {
         Tr  = !0
          for (va r t = 0 ; 64 >  t; ++t)  (mt[t]  = "ABC DEFGHIJ KLMNOPQ RSTUVWX YZabcde fghijkl mnopqrs tuvwxyz 0123456 789+/"[ t]), (l t["ABCD EFGHIJK LMNOPQR STUVWXY Zabcdef ghijklm nopqrst uvwxyz0 1234567 89+/".c harCode At(t)]  = t)
         ; (lt[45]  = 62),  (lt[95 ] = 63) 
    }
     fun ction t s(t, e,  r) {
          for (va r n = [ ], i =  e; i <  r; i +=  3) (e  = (t[i]  << 16)  + (t[i  + 1] < < 8) +  t[i + 2 ]), n.p ush(mt[ (e >> 1 8) & 63 ] + mt[ (e >> 1 2) & 63 ] + mt[ (e >> 6 ) & 63]  + mt[e  & 63]) 
         retur n n.joi n("")
     }
     funct ion Pn( t) {
         T r || Ln ()
         for  (var e  = t.le ngth, r  = e %  3, n =  "", i =  [], s  = 0, u  = e - r ; s < u ; s +=  16383)  i.push( ts(t, s , s + 1 6383 >  u ? u :  s + 16 383))
          return  r === 1  ? ((t  = t[e -  1]), ( n += mt [t >> 2 ]), (n  += mt[( t << 4)  & 63]) , (n +=  "=="))  : r == = 2 &&  ((t = ( t[e - 2 ] << 8)  + t[e  - 1]),  (n += m t[t >>  10]), ( n += mt [(t >>  4) & 63 ]), (n  += mt[( t << 2)  & 63]) , (n +=  "=")),  i.push (n), i. join("" )
    } 
    fu nction  Xe(t, e , r, n,  i) {
          var s =  8 * i  - n - 1 ,
              u = (1  << s) -  1,
              l = u  >> 1,
              g  = -7
         i  = r ?  i - 1 :  0
         var  p = r  ? -1 :  1,
              a = t[ e + i]
          for (i  += p,  r = a &  ((1 <<  -g) -  1), a > >= -g,  g += s;  0 < g;  r = 25 6 * r +  t[e +  i], i + = p, g  -= 8);
          for (s  = r &  ((1 <<  -g) - 1 ), r >> = -g, g  += n;  0 < g;  s = 256  * s +  t[e + i ], i +=  p, g - = 8);
          if (r = == 0) r  = 1 -  l
         else  {
              if (r  === u)  return  s ? NaN  : (1 /  0) * ( a ? -1  : 1)
              ;(s  += Math .pow(2,  n)), ( r -= l) 
         }
         re turn (a  ? -1 :  1) * s  * Math .pow(2,  r - n) 
    }
     fun ction J e(t, e,  r, n,  i, s) { 
         var u ,
              l = 8 *  s - i  - 1,
              g =  (1 << l ) - 1,
              p  = g >>  1,
              a = i  === 23  ? Math. pow(2,  -24) -  Math.po w(2, -7 7) : 0
          s = n  ? 0 : s  - 1
         v ar y =  n ? 1 :  -1,
              v =  0 > e | | (e == = 0 &&  0 > 1 /  e) ? 1  : 0
         f or (e =  Math.a bs(e),  isNaN(e ) || e  === 1 /  0 ? (( e = isN aN(e) ?  1 : 0) , (n =  g)) : ( (n = Ma th.floo r(Math. log(e)  / Math. LN2)),  1 > e *  (u = M ath.pow (2, -n) ) && (n --, (u  *= 2)),  (e = 1  <= n +  p ? e  + a / u  : e +  a * Mat h.pow(2 , 1 - p )), 2 < = e * u  && (n+ +, (u / = 2)),  n + p > = g ? ( (e = 0) , (n =  g)) : 1  <= n +  p ? (( e = (e  * u - 1 ) * Mat h.pow(2 , i)),  (n += p )) : (( e = e *  Math.p ow(2, p  - 1) *  Math.p ow(2, i )), (n  = 0)));  8 <= i ; t[r +  s] = e  & 255,  s += y , e /=  256, i  -= 8);
          for (n  = (n < < i) |  e, l +=  i; 0 <  l; t[r  + s] =  n & 25 5, s +=  y, n / = 256,  l -= 8) ;
         t[r  + s - y ] |= 12 8 * v
     }
     var e s = {}. toStrin g,
         Cn  =
              Array.i sArray  ||
              functi on (t)  {
                  ret urn es. call(t)  == "[o bject A rray]"
              }
     R.T YPED_AR RAY_SUP PORT =  Ne.TYPE D_ARRAY _SUPPOR T !== v oid 0 ?  Ne.TYP ED_ARRA Y_SUPPO RT : !0 
    va r rs =  R.TYPED _ARRAY_ SUPPORT  ? 2147 483647  : 10737 41823
     // f unction  It(t,  e) {
     //      if (( R.TYPED _ARRAY_ SUPPORT  ? 2147 483647  : 10737 41823)  < e) th row new  RangeE rror("I nvalid  typed a rray le ngth")
     //      ret urn R.T YPED_AR RAY_SUP PORT ?  ((t = n ew Uint 8Array( e)), (t .__prot o__ = R .protot ype)) :  (t ===  null & & (t =  new R(e )), (t. length  = e)),  t
    / / }
     functi on It(a rray, l ength)  {
         cons t maxLe ngth =  R.TYPED _ARRAY_ SUPPORT  ? 2147 483647  : 10737 41823;
          
         if ( length  > maxLe ngth) { 
             t hrow ne w Range Error(" Invalid  typed  array l ength") ;
         }
         
          if (R. TYPED_A RRAY_SU PPORT)  {
              array =  new Ui nt8Arra y(lengt h);
              Objec t.setPr ototype Of(arra y, R.pr ototype );
         } e lse {
              if  (array  === nul l) {
                   array =  new R( length) ;
              }
              array.l ength =  length ;
         }
         
          return  array; 
    }
     fun ction R (t, e,  r) {
         i f (!(R. TYPED_A RRAY_SU PPORT | | this  instanc eof R))  return  new R( t, e, r )
         if ( typeof  t == "n umber")  {
              if (ty peof e  == "str ing") t hrow Er ror("If  encodi ng is s pecifie d then  the fir st argu ment mu st be a  string ")
              return  Ir(thi s, t)
          }
         retu rn Bn(t his, t,  e, r)
     }
     ;(R. poolSiz e = 819 2),
         (R ._augme nt = fu nction  (t) {
              ret urn (t. __proto __ = R. prototy pe), t
          })
     functi on Bn(t , e, r,  n) {
          if (typ eof e = = "numb er") th row new  TypeEr ror('"v alue" a rgument  must n ot be a  number ')
         if  (typeof  ArrayB uffer <  "u" &&  e inst anceof  ArrayBu ffer) { 
             i f ((e.b yteLeng th, 0 >  r || e .byteLe ngth <  r)) thr ow new  RangeEr ror("'o ffset'  is out  of boun ds")
              if ( e.byteL ength <  r + (n  || 0))  throw  new Ran geError ("'leng th' is  out of  bounds" )
              return  (e = r  === voi d 0 &&  n === v oid 0 ?  new Ui nt8Arra y(e) :  n === v oid 0 ?  new Ui nt8Arra y(e, r)  : new  Uint8Ar ray(e,  r, n)),  R.TYPE D_ARRAY _SUPPOR T ? ((t  = e),  (t.__pr oto__ =  R.prot otype))  : (t =  Nr(t,  e)), t
          }
         if  (typeof  e == " string" ) {
              if (( (n = t) , (t =  r), (ty peof t  != "str ing" ||  t ===  "") &&  (t = "u tf8"),  !R.isEn coding( t))) th row new  TypeEr ror('"e ncoding " must  be a va lid str ing enc oding') 
             r eturn ( r = Un( e, t) |  0), (n  = It(n , r)),  (e = n. write(e , t)),  e !== r  && (n  = n.sli ce(0, e )), n
          }
         retu rn ns(t , e)
     }
     ;(R.fr om = fu nction  (t, e,  r) {
         r eturn B n(null,  t, e,  r)
     }),
         R. TYPED_A RRAY_SU PPORT & & ((R.p rototyp e.__pro to__ =  Uint8Ar ray.pro totype) , (R.__ proto__  = Uint 8Array) )
    f unction  Fn(t)  {
         if ( typeof  t != "n umber")  throw  new Typ eError( '"size"  argume nt must  be a n umber') 
         if (0  > t) t hrow ne w Range Error(' "size"  argumen t must  not be  negativ e')
     }
     R.alloc  = func tion (t , e, r)  {
         ret urn Fn( t), (t  = 0 >=  t ? It( null, t ) : e ! == void  0 ? (t ypeof r  == "st ring" ?  It(nul l, t).f ill(e,  r) : It (null,  t).fill (e)) :  It(null , t)),  t
    } 
    fu nction  Ir(t, e ) {
         if  ((Fn(e ), (t =  It(t,  0 > e ?  0 : kr (e) | 0 )), !R. TYPED_A RRAY_SU PPORT))  for (v ar r =  0; r <  e; ++r)  t[r] =  0
         ret urn t
     }
     ;(R.a llocUns afe = f unction  (t) {
          return  Ir(nul l, t)
     }),
          (R.all ocUnsaf eSlow =  functi on (t)  {
              return  Ir(null , t)
         } )
    f unction  Nr(t,  e) {
         v ar r =  0 > e.l ength ?  0 : kr (e.leng th) | 0 
         t = I t(t, r) 
         for ( var n =  0; n <  r; n + = 1) t[ n] = e[ n] & 25 5
         retu rn t
     }
     functi on ns(t , e) {
          if (vt (e)) {
              va r r = k r(e.len gth) |  0
              return  (t = It (t, r)) , t.len gth ===  0 || e .copy(t , 0, 0,  r), t
          }
         if  (e) {
              if  ((typeo f Array Buffer  < "u" & & e.buf fer ins tanceof  ArrayB uffer)  || "len gth" in  e) ret urn (r  = typeo f e.len gth !=  "number ") || ( (r = e. length) , (r =  r !== r )), r ?  It(t,  0) : Nr (t, e)
              if  (e.typ e === " Buffer"  && Cn( e.data) ) retur n Nr(t,  e.data )
         }
         t hrow ne w TypeE rror("F irst ar gument  must be  a stri ng, Buf fer, Ar rayBuff er, Arr ay, or  array-l ike obj ect.")
     }
     func tion kr (t) {
          if (t > = (R.TY PED_ARR AY_SUPP ORT ? 2 1474836 47 : 10 7374182 3)) thr ow new  RangeEr ror("At tempt t o alloc ate Buf fer lar ger tha n maxim um size : 0x" +  (R.TYP ED_ARRA Y_SUPPO RT ? 21 4748364 7 : 107 3741823 ).toStr ing(16)  + " by tes")
          return  t | 0
     }
     R.isB uffer =  Wn
     functi on vt(t ) {
         re turn !( t == nu ll || ! t._isBu ffer)
     }
     ;(R.c ompare  = funct ion (t,  e) {
          if (!vt (t) ||  !vt(e))  throw  new Typ eError( "Argume nts mus t be Bu ffers") 
         if (t  === e)  return  0
         for  (var r  = t.le ngth, n  = e.le ngth, i  = 0, s  = Math .min(r,  n); i  < s; ++ i)
              if (t[ i] !==  e[i]) { 
                  ;(r  = t[i]) , (n =  e[i])
                   break
              }
          return  r < n  ? -1 :  n < r ?  1 : 0
     }), 
         (R.is Encodin g = fun ction ( t) {
              swit ch (Str ing(t). toLower Case())  {
                  ca se "hex ":
                  ca se "utf 8":
                  c ase "ut f-8":
                   case " ascii": 
                  case  "latin 1":
                  c ase "bi nary":
                   case  "base64 ":
                  ca se "ucs 2":
                  c ase "uc s-2":
                   case " utf16le ":
                  ca se "utf -16le": 
                       return  !0
                  de fault:
                       r eturn ! 1
              }
         }),
          (R.con cat = f unction  (t, e)  {
              if (!C n(t)) t hrow ne w TypeE rror('" list" a rgument  must b e an Ar ray of  Buffers ')
              if (t. length  === 0)  return  R.alloc (0)
              var r 
             i f (e == = void  0) for  (r = e  = 0; r  < t.len gth; ++ r) e +=  t[r].l ength
              e =  R.allo cUnsafe (e)
              var n  = 0
              for  (r = 0;  r < t. length;  ++r) { 
                  var  i = t[r ]
                  if  (!vt(i) ) throw  new Ty peError ('"list " argum ent mus t be an  Array  of Buff ers')
                   i.copy (e, n),  (n +=  i.lengt h)
              }
              return  e
         })
     fun ction U n(t, e)  {
         if  (vt(t))  return  t.leng th
         if  (typeof  ArrayB uffer <  "u" &&  typeof  ArrayB uffer.i sView = = "func tion" & & (Arra yBuffer .isView (t) ||  t insta nceof A rrayBuf fer)) r eturn t .byteLe ngth
         t ypeof t  != "st ring" & & (t =  "" + t) 
         var r  = t.le ngth
         i f (r == = 0) re turn 0
          for (v ar n =  !1; ; ) 
             s witch ( e) {
                   case "a scii":
                   case  "latin1 ":
                  ca se "bin ary":
                       re turn r
                   case  "utf8": 
                  case  "utf-8 ":
                  ca se void  0:
                       retu rn tr(t ).lengt h
                  cas e "ucs2 ":
                  ca se "ucs -2":
                   case "u tf16le" :
                  cas e "utf- 16le":
                       r eturn 2  * r
                   case "h ex":
                       ret urn r > >> 1
                   case "b ase64": 
                       return  \$n(t).l ength
                   defaul t:
                       if (n ) retur n tr(t) .length 
                       ;(e = ( "" + e) .toLowe rCase() ), (n =  !0)
              }
     }
     R.byte Length  = Un
     funct ion is( t, e, r ) {
         va r n = ! 1
         if ( ((e ===  void 0  || 0 >  e) &&  (e = 0) , e > t his.len gth ||  ((r ===  void 0  || r >  this.l ength)  && (r =  this.l ength),  0 >= r ) || (( r >>>=  0), (e  >>>= 0) , r <=  e))) re turn "" 
         for ( t || (t  = "utf 8"); ;  )
              switch  (t) {
                   case " hex":
                       fo r (t =  e, e =  r, r =  this.le ngth, ( !t || 0  > t) & & (t =  0), (!e  || 0 >  e || e  > r) & & (e =  r), n =  "", r  = t; r  < e; ++ r) (t =  n), (n  = this [r]), ( n = 16  > n ? " 0" + n. toStrin g(16) :  n.toSt ring(16 )), (n  = t + n )
                       return  n
                  ca se "utf 8":
                  c ase "ut f-8":
                       re turn xn (this,  e, r)
                   case " ascii": 
                       for (t  = "", r  = Math .min(th is.leng th, r);  e < r;  ++e) t  += Str ing.fro mCharCo de(this [e] & 1 27)
                       retu rn t
                   case "l atin1": 
                  case  "binar y":
                       for  (t = "" , r = M ath.min (this.l ength,  r); e <  r; ++e ) t +=  String. fromCha rCode(t his[e]) 
                       return  t
                  cas e "base 64":
                       ret urn (e  = e ===  0 && r  === th is.leng th ? Pn (this)  : Pn(th is.slic e(e, r) )), e
                   case " ucs2":
                   case  "ucs-2" :
                  cas e "utf1 6le":
                   case " utf-16l e":
                       for  (e = th is.slic e(e, r) , r = " ", t =  0; t <  e.lengt h; t +=  2) r + = Strin g.fromC harCode (e[t] +  256 *  e[t + 1 ])
                       retur n r
                  d efault: 
                       if (n)  throw n ew Type Error(" Unknown  encodi ng: " +  t)
                       ;(t  = (t +  "").toL owerCas e()), ( n = !0) 
             } 
    }
     R.p rototyp e._isBu ffer =  !0
     functio n Ht(t,  e, r)  {
         var  n = t[e ]
         ;(t[ e] = t[ r]), (t [r] = n )
    } 
    ;( R.proto type.sw ap16 =  functio n () {
          var t  = this. length
          if (t  % 2 !==  0) thr ow new  RangeEr ror("Bu ffer si ze must  be a m ultiple  of 16- bits")
          for (v ar e =  0; e <  t; e +=  2) Ht( this, e , e + 1 )
         retu rn this 
    }) ,
         (R.p rototyp e.swap3 2 = fun ction ( ) {
              var t  = this .length 
             i f (t %  4 !== 0 ) throw  new Ra ngeErro r("Buff er size  must b e a mul tiple o f 32-bi ts")
              for  (var e  = 0; e  < t; e  += 4) H t(this,  e, e +  3), Ht (this,  e + 1,  e + 2)
              re turn th is
         }), 
         (R.pr ototype .swap64  = func tion ()  {
              var t  = this. length
              if  (t % 8  !== 0)  throw  new Ran geError ("Buffe r size  must be  a mult iple of  64-bit s")
              for ( var e =  0; e <  t; e + = 8) Ht (this,  e, e +  7), Ht( this, e  + 1, e  + 6),  Ht(this , e + 2 , e + 5 ), Ht(t his, e  + 3, e  + 4)
              retu rn this 
         }),
          (R.prot otype.t oString  = func tion ()  {
              var t  = this. length  | 0
              retur n t ===  0 ? ""  : argu ments.l ength = == 0 ?  xn(this , 0, t)  : is.a pply(th is, arg uments) 
         }),
          (R.prot otype.e quals =  functi on (t)  {
              if (!vt (t)) th row new  TypeEr ror("Ar gument  must be  a Buff er")
              retu rn this  === t  ? !0 :  R.compa re(this , t) == = 0
         }) ,
         (R.p rototyp e.inspe ct = fu nction  () {
              var  t = ""
              re turn 0  < this. length  && ((t  = this. toStrin g("hex" , 0, 50 ).match (/.{2}/ g).join (" ")),  50 < t his.len gth &&  (t += "  ... ") ), "<Bu ffer "  + t + " >"
         }), 
         (R.pr ototype .compar e = fun ction ( t, e, r , n, i)  {
              if (!v t(t)) t hrow ne w TypeE rror("A rgument  must b e a Buf fer")
              if  ((e ===  void 0  && (e  = 0), r  === vo id 0 &&  (r = t  ? t.le ngth :  0), n = == void  0 && ( n = 0),  i ===  void 0  && (i =  this.l ength),  0 > e  || r >  t.lengt h || 0  > n ||  i > thi s.lengt h)) thr ow new  RangeEr ror("ou t of ra nge ind ex")
              if ( n >= i  && e >=  r) ret urn 0
              if  (n >= i ) retur n -1
              if ( e >= r)  return  1
              if ((( e >>>=  0), (r  >>>= 0) , (n >> >= 0),  (i >>>=  0), th is ===  t)) ret urn 0
              var  s = i  - n,
                   u = r -  e,
                  l  = Math .min(s,  u)
              for ( n = thi s.slice (n, i),  t = t. slice(e , r), e  = 0; e  < l; + +e)
                  i f (n[e]  !== t[ e]) {
                       ;( s = n[e ]), (u  = t[e]) 
                       break
                   }
              return  s < u  ? -1 :  u < s ?  1 : 0
          })
     functi on Dn(t , e, r,  n, i)  {
         if ( t.lengt h === 0 ) retur n -1
         i f ((typ eof r = = "stri ng" ? ( (n = r) , (r =  0)) : 2 1474836 47 < r  ? (r =  2147483 647) :  -214748 3648 >  r && (r  = -214 7483648 ), (r =  +r), i sNaN(r)  && (r  = i ? 0  : t.le ngth -  1), 0 >  r && ( r = t.l ength +  r), r  >= t.le ngth))  {
              if (i)  return  -1
              r = t. length  - 1
         }  else if  (0 > r )
              if (i)  r = 0
              els e retur n -1
         i f ((typ eof e = = "stri ng" &&  (e = R. from(e,  n)), v t(e)))  return  e.lengt h === 0  ? -1 :  Mn(t,  e, r, n , i)
         i f (type of e ==  "numbe r") ret urn (e  &= 255) , R.TYP ED_ARRA Y_SUPPO RT && t ypeof U int8Arr ay.prot otype.i ndexOf  == "fun ction"  ? (i ?  Uint8Ar ray.pro totype. indexOf .call(t , e, r)  : Uint 8Array. prototy pe.last IndexOf .call(t , e, r) ) : Mn( t, [e],  r, n,  i)
         thr ow new  TypeErr or("val  must b e strin g, numb er or B uffer") 
    }
     fun ction M n(t, e,  r, n,  i) {
         f unction  s(p, a ) {
              retur n u ===  1 ? p[ a] : p. readUIn t16BE(a  * u)
          }
         var  u = 1,
              l  = t.len gth,
              g =  e.lengt h
         if ( n !== v oid 0 & & ((n =  String (n).toL owerCas e()), n  === "u cs2" ||  n ===  "ucs-2"  || n = == "utf 16le" | | n ===  "utf-1 6le"))  {
              if (2 >  t.leng th || 2  > e.le ngth) r eturn - 1
              ;(u = 2 ), (l / = 2), ( g /= 2) , (r /=  2)
         }
          if (i) 
             f or (n =  -1; r  < l; r+ +)
                  if  (s(t,  r) ===  s(e, n  === -1  ? 0 : r  - n))  {
                       if ((n  === -1  && (n  = r), r  - n +  1 === g )) retu rn n *  u
                  } e lse n ! == -1 & & (r -=  r - n) , (n =  -1)
         el se
              for (r  + g >  l && (r  = l -  g); 0 < = r; r- -) {
                   for (l  = !0, n  = 0; n  < g; n ++)
                       if ( s(t, r  + n) != = s(e,  n)) {
                            l = ! 1
                           br eak
                       }
                   if (l)  return  r
              }
         retu rn -1
     }
     ;(R.p rototyp e.inclu des = f unction  (t, e,  r) {
          return  this.in dexOf(t , e, r)  !== -1 
    }) ,
         (R.p rototyp e.index Of = fu nction  (t, e,  r) {
              retu rn Dn(t his, t,  e, r,  !0)
         }) ,
         (R.p rototyp e.lastI ndexOf  = funct ion (t,  e, r)  {
              return  Dn(this , t, e,  r, !1) 
         }),
          (R.prot otype.w rite =  functio n (t, e , r, n)  {
              if (e  === voi d 0) (n  = "utf 8"), (r  = this .length ), (e =  0)
              else  if (r = == void  0 && t ypeof e  == "st ring")  (n = e) , (r =  this.le ngth),  (e = 0) 
             e lse if  (isFini te(e))  (e |= 0 ), isFi nite(r)  ? ((r  |= 0),  n === v oid 0 & & (n =  "utf8") ) : ((n  = r),  (r = vo id 0))
              el se thro w Error ("Buffe r.write (string , encod ing, of fset[,  length] ) is no  longer  suppor ted")
              var  i = th is.leng th - e
              if  (((r = == void  0 || r  > i) & & (r =  i), (0  < t.len gth &&  (0 > r  || 0 >  e)) ||  e > thi s.lengt h)) thr ow new  RangeEr ror("At tempt t o write  outsid e buffe r bound s")
              for ( n || (n  = "utf 8"), i  = !1; ;  )
                  sw itch (n ) {
                       case  "hex": 
                           t:  {
                                if (( (e = Nu mber(e)  || 0),  (n = t his.len gth - e ), r ?  ((r = N umber(r )), r >  n && ( r = n))  : (r =  n), (n  = t.le ngth),  n % 2 ! == 0))  throw n ew Type Error(" Invalid  hex st ring")
                                 for (r  > n / 2  && (r  = n / 2 ), n =  0; n <  r; ++n)  {
                                     if (((i  = pars eInt(t. substr( 2 * n,  2), 16) ), isNa N(i)))  {
                                         t =  n
                                         brea k t
                                     }
                                     this[e  + n] =  i
                                }
                                t =  n
                           } 
                           ret urn t
                       ca se "utf 8":
                       case  "utf-8 ":
                           r eturn k e(tr(t,  this.l ength -  e), th is, e,  r)
                       case  "ascii" :
                           re turn ke (Yn(t),  this,  e, r)
                       ca se "lat in1":
                       ca se "bin ary":
                            retur n ke(Yn (t), th is, e,  r)
                       case  "base64 ":
                           r eturn k e(\$n(t) , this,  e, r)
                       c ase "uc s2":
                       cas e "ucs- 2":
                       case  "utf16 le":
                       cas e "utf- 16le":
                            ;(n  = t), ( i = thi s.lengt h - e)
                            for  (var s  = [], u  = 0; u  < n.le ngth &&  !(0 >  (i -= 2 )); ++u ) {
                                var  l = n. charCod eAt(u)
                                 ;(t = l  >> 8),  (l %=  256), s .push(l ), s.pu sh(t)
                            }
                            return  ke(s, t his, e,  r)
                       defa ult:
                            if (i)  throw  new Typ eError( "Unknow n encod ing: "  + n)
                            ;(n =  ("" + n ).toLow erCase( )), (i  = !0)
                   }
         }), 
         (R.pr ototype .toJSON  = func tion ()  {
              return  { type : "Buff er", da ta: Arr ay.prot otype.s lice.ca ll(this ._arr | | this,  0) }
          })
     functio n xn(t,  e, r)  {
         r =  Math.mi n(t.len gth, r) 
         for ( var n =  []; e  < r; )  {
              var i =  t[e],
                   s = n ull,
                   u = 239  < i ?  4 : 223  < i ?  3 : 191  < i ?  2 : 1
              if  (e + u  <= r)
                   switch  (u) {
                       c ase 1:
                            128  > i &&  (s = i) 
                           bre ak
                       case  2:
                           v ar l =  t[e + 1 ]
                           ;( l & 192 ) === 1 28 && ( (i = (( i & 31)  << 6)  | (l &  63)), 1 27 < i  && (s =  i))
                            break
                       c ase 3:
                            l =  t[e + 1 ]
                           va r g = t [e + 2] 
                           ;(l  & 192)  === 12 8 && (g  & 192)  === 12 8 && (( i = ((i  & 15)  << 12)  | ((l &  63) <<  6) | ( g & 63) ), 2047  < i &&  (55296  > i ||  57343  < i) &&  (s = i ))
                           b reak
                       cas e 4:
                            ;(l =  t[e + 1 ]), (g  = t[e +  2])
                            var p  = t[e +  3]
                            ;(l & 1 92) ===  128 &&  (g & 1 92) ===  128 &&  (p & 1 92) ===  128 &&  ((i =  ((i & 1 5) << 1 8) | (( l & 63)  << 12)  | ((g  & 63) < < 6) |  (p & 63 )), 655 35 < i  && 1114 112 > i  && (s  = i))
                   }
              s ===  null ?  ((s = 6 5533),  (u = 1) ) : 655 35 < s  && ((s  -= 6553 6), n.p ush(((s  >>> 10 ) & 102 3) | 55 296), ( s = 563 20 | (s  & 1023 ))), n. push(s) , (e +=  u)
         }
          if ((( t = n.l ength),  t <= j n)) n =  String .fromCh arCode. apply(S tring,  n)
         els e {
              for ( r = "",  e = 0;  e < t;  ) r +=  String .fromCh arCode. apply(S tring,  n.slice (e, (e  += jn)) )
              n = r
          }
         retu rn n
     }
     var jn  = 4096 
    R. prototy pe.slic e = fun ction ( t, e) { 
         var r  = this .length 
         if (( (t = ~~ t), (e  = e ===  void 0  ? r :  ~~e), 0  > t ?  ((t +=  r), 0 >  t && ( t = 0))  : t >  r && (t  = r),  0 > e ?  ((e +=  r), 0  > e &&  (e = 0) ) : e >  r && ( e = r),  e < t  && (e =  t), R. TYPED_A RRAY_SU PPORT))  (e = t his.sub array(t , e)),  (e.__pr oto__ =  R.prot otype)
          else { 
             ; (r = e  - t), ( e = new  R(r, v oid 0)) 
             f or (var  n = 0;  n < r;  ++n) e [n] = t his[n +  t]
         }
          return  e
     }
    f unction  Z(t, e , r) {
          if (t  % 1 !==  0 || 0  > t) t hrow ne w Range Error(" offset  is not  uint")
          if (t  + e > r ) throw  new Ra ngeErro r("Tryi ng to a ccess b eyond b uffer l ength") 
    }
     ;(R .protot ype.rea dUIntLE  = func tion (t , e, r)  {
         ;(t  |= 0),  (e |=  0), r | | Z(t,  e, this .length ), (r =  this[t ])
         for  (var n  = 1, i  = 0; + +i < e  && (n * = 256);  ) r +=  this[t  + i] *  n
         ret urn r
     }),
          (R.pro totype. readUIn tBE = f unction  (t, e,  r) {
              ;(t  |= 0),  (e |=  0), r | | Z(t,  e, this .length ), (r =  this[t  + --e] )
              for (va r n = 1 ; 0 < e  && (n  *= 256) ; ) r + = this[ t + --e ] * n
              ret urn r
          }),
         (R .protot ype.rea dUInt8  = funct ion (t,  e) {
              ret urn e | | Z(t,  1, this .length ), this [t]
         }) ,
         (R.p rototyp e.readU Int16LE  = func tion (t , e) {
              re turn e  || Z(t,  2, thi s.lengt h), thi s[t] |  (this[t  + 1] < < 8)
         } ),
         (R. prototy pe.read UInt16B E = fun ction ( t, e) { 
             r eturn e  || Z(t , 2, th is.leng th), (t his[t]  << 8) |  this[t  + 1]
          }),
         (R .protot ype.rea dUInt32 LE = fu nction  (t, e)  {
              return  e || Z( t, 4, t his.len gth), ( this[t]  | (thi s[t + 1 ] << 8)  | (thi s[t + 2 ] << 16 )) + 16 777216  * this[ t + 3]
          }),
         ( R.proto type.re adUInt3 2BE = f unction  (t, e)  {
              return  e || Z (t, 4,  this.le ngth),  1677721 6 * thi s[t] +  ((this[ t + 1]  << 16)  | (this [t + 2]  << 8)  | this[ t + 3]) 
         }),
          (R.prot otype.r eadIntL E = fun ction ( t, e, r ) {
              ;(t | = 0), ( e |= 0) , r ||  Z(t, e,  this.l ength),  (r = t his[t]) 
             f or (var  n = 1,  i = 0;  ++i <  e && (n  *= 256 ); ) r  += this [t + i]  * n
              retu rn r >=  128 *  n && (r  -= Mat h.pow(2 , 8 * e )), r
          }),
         (R .protot ype.rea dIntBE  = funct ion (t,  e, r)  {
              ;(t |=  0), (e  |= 0),  r || Z( t, e, t his.len gth), ( r = e)
              fo r (var  n = 1,  i = thi s[t + - -r]; 0  < r &&  (n *= 2 56); )  i += th is[t +  --r] *  n
              return  i >= 12 8 * n & & (i -=  Math.p ow(2, 8  * e)),  i
         }), 
         (R.pr ototype .readIn t8 = fu nction  (t, e)  {
              return  e || Z( t, 1, t his.len gth), t his[t]  & 128 ?  -1 * ( 255 - t his[t]  + 1) :  this[t] 
         }),
          (R.prot otype.r eadInt1 6LE = f unction  (t, e)  {
              return  e || Z (t, 2,  this.le ngth),  (t = th is[t] |  (this[ t + 1]  << 8)),  t & 32 768 ? t  | 4294 901760  : t
         }) ,
         (R.p rototyp e.readI nt16BE  = funct ion (t,  e) {
              ret urn e | | Z(t,  2, this .length ), (t =  this[t  + 1] |  (this[ t] << 8 )), t &  32768  ? t | 4 2949017 60 : t
          }),
         ( R.proto type.re adInt32 LE = fu nction  (t, e)  {
              return  e || Z( t, 4, t his.len gth), t his[t]  | (this [t + 1]  << 8)  | (this [t + 2]  << 16)  | (thi s[t + 3 ] << 24 )
         }),
          (R.pro totype. readInt 32BE =  functio n (t, e ) {
              retur n e ||  Z(t, 4,  this.l ength),  (this[ t] << 2 4) | (t his[t +  1] <<  16) | ( this[t  + 2] <<  8) | t his[t +  3]
         }) ,
         (R.p rototyp e.readF loatLE  = funct ion (t,  e) {
              ret urn e | | Z(t,  4, this .length ), Xe(t his, t,  !0, 23 , 4)
         } ),
         (R. prototy pe.read FloatBE  = func tion (t , e) {
              re turn e  || Z(t,  4, thi s.lengt h), Xe( this, t , !1, 2 3, 4)
          }),
         (R .protot ype.rea dDouble LE = fu nction  (t, e)  {
              return  e || Z( t, 8, t his.len gth), X e(this,  t, !0,  52, 8) 
         }),
          (R.prot otype.r eadDoub leBE =  functio n (t, e ) {
              retur n e ||  Z(t, 8,  this.l ength),  Xe(thi s, t, ! 1, 52,  8)
         })
     fun ction n t(t, e,  r, n,  i, s) { 
         if (! vt(t))  throw n ew Type Error(' "buffer " argum ent mus t be a  Buffer  instanc e')
         if  (e > i  || e <  s) thr ow new  RangeEr ror('"v alue" a rgument  is out  of bou nds')
          if (r +  n > t. length)  throw  new Ran geError ("Index  out of  range" )
    } 
    ;( R.proto type.wr iteUInt LE = fu nction  (t, e,  r, n) { 
         ;(t =  +t), ( e |= 0) , (r |=  0), n  || nt(t his, t,  e, r,  Math.po w(2, 8  * r) -  1, 0),  (n = 1) 
         var i  = 0
         f or (thi s[e] =  t & 255 ; ++i <  r && ( n *= 25 6); ) t his[e +  i] = ( t / n)  & 255
          return  e + r
     }),
          (R.pro totype. writeUI ntBE =  functio n (t, e , r, n)  {
              ;(t =  +t), (e  |= 0),  (r |=  0), n | | nt(th is, t,  e, r, M ath.pow (2, 8 *  r) - 1 , 0), ( n = r -  1)
              var i  = 1
              for  (this[e  + n] =  t & 25 5; 0 <=  --n &&  (i *=  256); )  this[e  + n] =  (t / i ) & 255 
             r eturn e  + r
         } ),
         (R. prototy pe.writ eUInt8  = funct ion (t,  e, r)  {
              return  (t = +t ), (e | = 0), r  || nt( this, t , e, 1,  255, 0 ), R.TY PED_ARR AY_SUPP ORT ||  (t = Ma th.floo r(t)),  (this[e ] = t &  255),  e + 1
          })
     functio n Ze(t,  e, r,  n) {
         0  > e &&  (e = 6 5535 +  e + 1)
          for (v ar i =  0, s =  Math.mi n(t.len gth - r , 2); i  < s; + +i) t[r  + i] =  (e & ( 255 <<  (8 * (n  ? i :  1 - i)) )) >>>  (8 * (n  ? i :  1 - i)) 
    }
     ;(R .protot ype.wri teUInt1 6LE = f unction  (t, e,  r) {
          return  (t = +t ), (e | = 0), r  || nt( this, t , e, 2,  65535,  0), R. TYPED_A RRAY_SU PPORT ?  ((this [e] = t  & 255) , (this [e + 1]  = t >> > 8)) :  Ze(thi s, t, e , !0),  e + 2
     }),
          (R.pro totype. writeUI nt16BE  = funct ion (t,  e, r)  {
              return  (t = +t ), (e | = 0), r  || nt( this, t , e, 2,  65535,  0), R. TYPED_A RRAY_SU PPORT ?  ((this [e] = t  >>> 8) , (this [e + 1]  = t &  255)) :  Ze(thi s, t, e , !1),  e + 2
          })
     functio n Qe(t,  e, r,  n) {
         0  > e &&  (e = 4 2949672 95 + e  + 1)
         f or (var  i = 0,  s = Ma th.min( t.lengt h - r,  4); i <  s; ++i ) t[r +  i] = ( e >>> ( 8 * (n  ? i : 3  - i)))  & 255
     }
     ;(R. prototy pe.writ eUInt32 LE = fu nction  (t, e,  r) {
         r eturn ( t = +t) , (e |=  0), r  || nt(t his, t,  e, 4,  4294967 295, 0) , R.TYP ED_ARRA Y_SUPPO RT ? (( this[e  + 3] =  t >>> 2 4), (th is[e +  2] = t  >>> 16) , (this [e + 1]  = t >> > 8), ( this[e]  = t &  255)) :  Qe(thi s, t, e , !0),  e + 4
     }),
          (R.pro totype. writeUI nt32BE  = funct ion (t,  e, r)  {
              return  (t = +t ), (e | = 0), r  || nt( this, t , e, 4,  429496 7295, 0 ), R.TY PED_ARR AY_SUPP ORT ? ( (this[e ] = t > >> 24),  (this[ e + 1]  = t >>>  16), ( this[e  + 2] =  t >>> 8 ), (thi s[e + 3 ] = t &  255))  : Qe(th is, t,  e, !1),  e + 4
          }),
         ( R.proto type.wr iteIntL E = fun ction ( t, e, r , n) {
              ;( t = +t) , (e |=  0), n  || ((n  = Math. pow(2,  8 * r -  1)), n t(this,  t, e,  r, n -  1, -n)) , (n =  0)
              var i  = 1,
                   s = 0
              for  (this[ e] = t  & 255;  ++n < r  && (i  *= 256) ; ) 0 >  t && s  === 0  && this [e + n  - 1] != = 0 &&  (s = 1) , (this [e + n]  = (((t  / i) > > 0) -  s) & 25 5)
              return  e + r
          }),
         ( R.proto type.wr iteIntB E = fun ction ( t, e, r , n) {
              ;( t = +t) , (e |=  0), n  || ((n  = Math. pow(2,  8 * r -  1)), n t(this,  t, e,  r, n -  1, -n)) , (n =  r - 1)
              va r i = 1 ,
                  s =  0
              for (t his[e +  n] = t  & 255;  0 <= - -n && ( i *= 25 6); ) 0  > t &&  s ===  0 && th is[e +  n + 1]  !== 0 & & (s =  1), (th is[e +  n] = (( (t / i)  >> 0)  - s) &  255)
              retu rn e +  r
         }),
          (R.pro totype. writeIn t8 = fu nction  (t, e,  r) {
              retu rn (t =  +t), ( e |= 0) , r ||  nt(this , t, e,  1, 127 , -128) , R.TYP ED_ARRA Y_SUPPO RT || ( t = Mat h.floor (t)), 0  > t &&  (t = 2 55 + t  + 1), ( this[e]  = t &  255), e  + 1
         } ),
         (R. prototy pe.writ eInt16L E = fun ction ( t, e, r ) {
              retur n (t =  +t), (e  |= 0),  r || n t(this,  t, e,  2, 3276 7, -327 68), R. TYPED_A RRAY_SU PPORT ?  ((this [e] = t  & 255) , (this [e + 1]  = t >> > 8)) :  Ze(thi s, t, e , !0),  e + 2
          }),
         (R .protot ype.wri teInt16 BE = fu nction  (t, e,  r) {
              retu rn (t =  +t), ( e |= 0) , r ||  nt(this , t, e,  2, 327 67, -32 768), R .TYPED_ ARRAY_S UPPORT  ? ((thi s[e] =  t >>> 8 ), (thi s[e + 1 ] = t &  255))  : Ze(th is, t,  e, !1),  e + 2
          }),
         ( R.proto type.wr iteInt3 2LE = f unction  (t, e,  r) {
              ret urn (t  = +t),  (e |= 0 ), r ||  nt(thi s, t, e , 4, 21 4748364 7, -214 7483648 ), R.TY PED_ARR AY_SUPP ORT ? ( (this[e ] = t &  255),  (this[e  + 1] =  t >>>  8), (th is[e +  2] = t  >>> 16) , (this [e + 3]  = t >> > 24))  : Qe(th is, t,  e, !0),  e + 4
          }),
         ( R.proto type.wr iteInt3 2BE = f unction  (t, e,  r) {
              ret urn (t  = +t),  (e |= 0 ), r ||  nt(thi s, t, e , 4, 21 4748364 7, -214 7483648 ), 0 >  t && (t  = 4294 967295  + t + 1 ), R.TY PED_ARR AY_SUPP ORT ? ( (this[e ] = t > >> 24),  (this[ e + 1]  = t >>>  16), ( this[e  + 2] =  t >>> 8 ), (thi s[e + 3 ] = t &  255))  : Qe(th is, t,  e, !1),  e + 4
          })
     functi on be(t , e, r,  n) {
          if (r +  n > t. length)  throw  new Ran geError ("Index  out of  range" )
         if ( 0 > r)  throw n ew Rang eError( "Index  out of  range") 
    }
     ;(R .protot ype.wri teFloat LE = fu nction  (t, e,  r) {
         r eturn r  || be( this, t , e, 4) , Je(th is, t,  e, !0,  23, 4),  e + 4
     }), 
         (R.pr ototype .writeF loatBE  = funct ion (t,  e, r)  {
              return  r || be (this,  t, e, 4 ), Je(t his, t,  e, !1,  23, 4) , e + 4 
         }),
          (R.prot otype.w riteDou bleLE =  functi on (t,  e, r) { 
             r eturn r  || be( this, t , e, 8) , Je(th is, t,  e, !0,  52, 8),  e + 8
          }),
         ( R.proto type.wr iteDoub leBE =  functio n (t, e , r) {
              re turn r  || be(t his, t,  e, 8),  Je(thi s, t, e , !1, 5 2, 8),  e + 8
          }),
         (R .protot ype.cop y = fun ction ( t, e, r , n) {
              if  ((r ||  (r = 0 ), n ||  n ===  0 || (n  = this .length ), e >=  t.leng th && ( e = t.l ength),  e || ( e = 0),  0 < n  && n <  r && (n  = r),  n === r  || t.l ength = == 0 ||  this.l ength = == 0))  return  0
              if (0 >  e) thr ow new  RangeEr ror("ta rgetSta rt out  of boun ds")
              if ( 0 > r | | r >=  this.le ngth) t hrow ne w Range Error(" sourceS tart ou t of bo unds")
              if  (0 > n ) throw  new Ra ngeErro r("sour ceEnd o ut of b ounds") 
             n  > this .length  && (n  = this. length) , t.len gth - e  < n -  r && (n  = t.le ngth -  e + r)
              va r i = n  - r
              if ( this == = t &&  r < e & & e < n ) for ( n = i -  1; 0 < = n; -- n) t[n  + e] =  this[n  + r]
              else  if (1e 3 > i | | !R.TY PED_ARR AY_SUPP ORT) fo r (n =  0; n <  i; ++n)  t[n +  e] = th is[n +  r]
              else U int8Arr ay.prot otype.s et.call (t, thi s.subar ray(r,  r + i),  e)
              retur n i
         }) ,
         (R.p rototyp e.fill  = funct ion (t,  e, r,  n) {
              if ( typeof  t == "s tring")  {
                  if  ((type of e ==  "strin g" ? (( n = e),  (e = 0 ), (r =  this.l ength))  : type of r ==  "strin g" && ( (n = r) , (r =  this.le ngth)),  t.leng th ===  1)) {
                       va r i = t .charCo deAt(0) 
                       256 > i  && (t  = i)
                   }
                  if  (n !==  void 0  && type of n !=  "strin g") thr ow new  TypeErr or("enc oding m ust be  a strin g")
                  i f (type of n ==  "strin g" && ! R.isEnc oding(n )) thro w new T ypeErro r("Unkn own enc oding:  " + n)
              }  else ty peof t  == "num ber" &&  (t &=  255)
              if ( 0 > e | | this. length  < e ||  this.le ngth <  r) thro w new R angeErr or("Out  of ran ge inde x")
              if (r  <= e)  return  this
              if ( ((e >>> = 0), ( r = r = == void  0 ? th is.leng th : r  >>> 0),  t || ( t = 0),  typeof  t == " number" )) for  (n = e;  n < r;  ++n) t his[n]  = t
              else  for (t  = vt(t)  ? t :  tr(new  R(t, n) .toStri ng()),  i = t.l ength,  n = 0;  n < r -  e; ++n ) this[ n + e]  = t[n %  i]
              retur n this
          })
     var os  = /[^+ \\/0-9A- Za-z-_] /g
     functio n tr(t,  e) {
          e = e | | 1 / 0 
         for ( var r,  n = t.l ength,  i = nul l, s =  [], u =  0; u <  n; ++u ) {
              if (( (r = t. charCod eAt(u)) , 55295  < r &&  57344  > r)) { 
                  if ( !i) {
                       if  (56319  < r) { 
                           ;-1  < (e - = 3) &&  s.push (239, 1 91, 189 )
                           co ntinue
                       }  else i f (u +  1 === n ) {
                            ;-1 < ( e -= 3)  && s.p ush(239 , 191,  189)
                            contin ue
                       }
                       i =  r
                       contin ue
                  }
                   if (5 6320 >  r) {
                       ;-1  < (e - = 3) &&  s.push (239, 1 91, 189 ), (i =  r)
                       cont inue
                   }
                  r =  (((i -  55296)  << 10)  | (r -  56320) ) + 655 36
              } else  i && - 1 < (e  -= 3) & & s.pus h(239,  191, 18 9)
              if ((( i = nul l), 128  > r))  {
                  if  (0 > -- e) brea k
                  s.p ush(r)
              }  else if  (2048  > r) {
                   if (0  > (e - = 2)) b reak
                   s.push( (r >> 6 ) | 192 , (r &  63) | 1 28)
              } els e if (6 5536 >  r) {
                   if (0 >  (e -=  3)) bre ak
                  s. push((r  >> 12)  | 224,  ((r >>  6) & 6 3) | 12 8, (r &  63) |  128)
              } el se if ( 1114112  > r) { 
                  if ( 0 > (e  -= 4))  break
                   s.push ((r >>  18) | 2 40, ((r  >> 12)  & 63)  | 128,  ((r >>  6) & 63 ) | 128 , (r &  63) | 1 28)
              } els e throw  Error( "Invali d code  point") 
         }
         re turn s
     }
     func tion Yn (t) {
          for (va r e = [ ], r =  0; r <  t.lengt h; ++r)  e.push (t.char CodeAt( r) & 25 5)
         ret urn e
     }
     funct ion \$n( t) {
         i f (((t  = (t.tr im ? t. trim()  : t.rep lace(/^ \\s+|\\s+ \$/g, "" )).repl ace(os,  "")),  2 > t.l ength))  t = "" 
         else  for (;  t.lengt h % 4 ! == 0; )  t += " ="
         Tr  || Ln() 
         var e  = t.le ngth
         i f (0 <  e % 4)  throw E rror("I nvalid  string.  Length  must b e a mul tiple o f 4")
          var r =  t[e -  2] ===  "=" ? 2  : t[e  - 1] == = "=" ?  1 : 0, 
             n  = new  bo((3 *  e) / 4  - r),
              i  = 0 < r  ? e -  4 : e,
              s  = 0
         fo r (e =  0; e <  i; e +=  4) {
              var  u = (l t[t.cha rCodeAt (e)] <<  18) |  (lt[t.c harCode At(e +  1)] <<  12) | ( lt[t.ch arCodeA t(e + 2 )] << 6 ) | lt[ t.charC odeAt(e  + 3)]
              ;( n[s++]  = (u >>  16) &  255), ( n[s++]  = (u >>  8) & 2 55), (n [s++] =  u & 25 5)
         }
          return  r === 2  ? ((u  = (lt[t .charCo deAt(e) ] << 2)  | (lt[ t.charC odeAt(e  + 1)]  >> 4)),  (n[s++ ] = u &  255))  : r ===  1 && ( (u = (l t[t.cha rCodeAt (e)] <<  10) |  (lt[t.c harCode At(e +  1)] <<  4) | (l t[t.cha rCodeAt (e + 2) ] >> 2) ), (n[s ++] = ( u >> 8)  & 255) , (n[s+ +] = u  & 255)) , n
     }
     functio n ke(t,  e, r,  n) {
         f or (var  i = 0;  i < n  && !(i  + r >=  e.lengt h || i  >= t.le ngth);  ++i) e[ i + r]  = t[i]
          return  i
     }
    f unction  Wn(t)  {
         retu rn t !=  null & & (!!t. _isBuff er || G n(t) ||  (typeo f t.rea dFloatL E == "f unction " && ty peof t. slice = = "func tion" & & Gn(t. slice(0 , 0)))) 
    }
     fun ction G n(t) {
          return  !!t.co nstruct or && t ypeof t .constr uctor.i sBuffer  == "fu nction"  && t.c onstruc tor.isB uffer(t )
    } 
    va r er =  Object. freeze( {
              __proto __: nul l,
              INSPEC T_MAX_B YTES: 5 0,
              kMaxLe ngth: r s,
              Buffer : R,
              Slow Buffer:  functi on (t)  {
                  ret urn +t  != t &&  (t = 0 ), R.al loc(+t) 
             } ,
              isBuffe r: Wn,
          }),
         z  = R,
          rr = ty peof gl obalThi s < "u"  ? glob alThis  : typeo f windo w < "u"  ? wind ow : ty peof gl obal <  "u" ? g lobal :  typeof  self <  "u" ?  self :  {}
     functio n Lr(t,  e) {
          return  (e = {  exports : {} }) , t(e,  e.expor ts), e. exports 
    }
     fun ction z n() {
          throw E rror("s etTimeo ut has  not bee n defin ed")
     }
     functi on Vn()  {
         thr ow Erro r("clea rTimeou t has n ot been  define d")
     }
     var Ut  = zn,
          Dt = Vn 
    ty peof Ne .setTim eout ==  "funct ion" &&  (Ut =  setTime out), t ypeof N e.clear Timeout  == "fu nction"  && (Dt  = clea rTimeou t)
     functio n qn(t)  {
         if  (Ut ===  setTim eout) r eturn s etTimeo ut(t, 0 )
         if ( (Ut ===  zn ||  !Ut) &&  setTim eout) r eturn ( Ut = se tTimeou t), set Timeout (t, 0)
          try {
              re turn Ut (t, 0)
          } catc h {
              try { 
                  retu rn Ut.c all(nul l, t, 0 )
              } catch  {
                  re turn Ut .call(t his, t,  0)
              }
         }
     }
     func tion ss (t) {
          if (Dt  === cle arTimeo ut) ret urn cle arTimeo ut(t)
          if ((Dt  === Vn  || !Dt ) && cl earTime out) re turn (D t = cle arTimeo ut), cl earTime out(t)
          try {
              re turn Dt (t)
         }  catch { 
             t ry {
                   return  Dt.call (null,  t)
              } catc h {
                  r eturn D t.call( this, t )
              }
         }
     }
     var Nt  = [],
          le = ! 1,
         Xt, 
         nr =  -1
     functio n us()  {
         le & & Xt &&  ((le =  !1), X t.lengt h ? (Nt  = Xt.c oncat(N t)) : ( nr = -1 ), Nt.l ength & & Kn()) 
    }
     fun ction K n() {
          if (!le ) {
              var t  = qn(u s)
              le = ! 0
              for (va r e = N t.lengt h; e; )  {
                  fo r (Xt =  Nt, Nt  = [];  ++nr <  e; ) Xt  && Xt[ nr].run ()
                  ;( nr = -1 ), (e =  Nt.len gth)
              }
              ;(Xt  = null ), (le  = !1),  ss(t)
          }
    } 
    fu nction  Hn(t) { 
         var e  = Arra y(argum ents.le ngth -  1)
         if  (1 < ar guments .length ) for ( var r =  1; r <  argume nts.len gth; r+ +) e[r  - 1] =  argumen ts[r]
          Nt.push (new Xn (t, e)) , Nt.le ngth != = 1 ||  le || q n(Kn)
     }
     funct ion Xn( t, e) { 
         ;(thi s.fun =  t), (t his.arr ay = e) 
    }
     Xn. prototy pe.run  = funct ion ()  {
         this .fun.ap ply(nul l, this .array) 
    }
     fun ction J t() {}
     var  ce = N e.perfo rmance  || {},
          fs =
              ce. now ||
              ce .mozNow  ||
              ce.ms Now ||
              ce .oNow | |
              ce.webk itNow | |
              functio n () {
                   retur n new D ate().g etTime( )
              },
         hs  = new D ate(),
          ls = { 
             n extTick : Hn,
              tit le: "br owser", 
             b rowser:  !0,
              env:  {},
              argv : [],
              ver sion: " ",
              versio ns: {}, 
             o n: Jt,
              ad dListen er: Jt, 
             o nce: Jt ,
              off: Jt ,
              removeL istener : Jt,
              rem oveAllL istener s: Jt,
              em it: Jt, 
             b inding:  functi on () { 
                  thro w Error ("proce ss.bind ing is  not sup ported" )
              },
              cwd: f unction  () {
                   return  "/"
              },
              chd ir: fun ction ( ) {
                  t hrow Er ror("pr ocess.c hdir is  not su pported ")
              },
              umask : funct ion ()  {
                  ret urn 0
              },
              hr time: f unction  (t) {
                   var e  = 0.00 1 * fs. call(ce ),
                       r = M ath.flo or(e)
                   return  (e = M ath.flo or((e %  1) * 1 e9)), t  && ((r  -= t[0 ]), (e  -= t[1] ), 0 >  e && (r --, (e  += 1e9) )), [r,  e]
              },
              plat form: " browser ",
              releas e: {},
              co nfig: { },
              uptime : funct ion ()  {
                  ret urn (ne w Date( ) - hs)  / 1e3
              }, 
         },
         J n = Lr( functio n (t, e ) {
              funct ion r(s , u) {
                   for ( var l i n s) u[ l] = s[ l]
              }
              functi on n(s,  u, l)  {
                  ret urn i(s , u, l) 
             } 
             v ar i =  er.Buff er
              i.from  && i.a lloc &&  i.allo cUnsafe  && i.a llocUns afeSlow  ? (t.e xports  = er) :  (r(er,  e), (e .Buffer  = n)), 
                  (n.p rototyp e = Obj ect.cre ate(i.p rototyp e)),
                   r(i, n) ,
                  (n. from =  functio n (s, u , l) {
                       i f (type of s ==  "numbe r") thr ow new  TypeErr or("Arg ument m ust not  be a n umber") 
                       return  i(s, u,  l)
                  } ),
                  (n .alloc  = funct ion (s,  u, l)  {
                       if (ty peof s  != "num ber") t hrow ne w TypeE rror("A rgument  must b e a num ber")
                       re turn (s  = i(s) ), u != = void  0 ? (ty peof l  == "str ing" ?  s.fill( u, l) :  s.fill (u)) :  s.fill( 0), s
                   }),
                   (n.allo cUnsafe  = func tion (s ) {
                       if ( typeof  s != "n umber")  throw  new Typ eError( "Argume nt must  be a n umber") 
                       return  i(s)
                   }),
                  ( n.alloc UnsafeS low = f unction  (s) {
                       i f (type of s !=  "numbe r") thr ow new  TypeErr or("Arg ument m ust be  a numbe r")
                       retu rn er.S lowBuff er(s)
                   })
         }) ,
         cs =  Lr(fun ction ( t, e) { 
             f unction  r() {
                   throw  Error( \`secure  random  number  genera tion no t suppo rted by  this b rowser
 use chr ome, Fi reFox o r Inter net Exp lorer 1 1\`)
              }
              funct ion n(v , w) {
                   if (t ypeof v  != "nu mber" | | v !==  v) thr ow new  TypeErr or("off set mus t be a  number" )
                  if  (v > y  || 0 >  v) thro w new T ypeErro r("offs et must  be a u int32") 
                  if ( v > p | | v > w ) throw  new Ra ngeErro r("offs et out  of rang e")
              }
              funct ion i(v , w, O)  {
                  if  (typeo f v !=  "number " || v  !== v)  throw n ew Type Error(" size mu st be a  number ")
                  if  (v > y  || 0 >  v) thr ow new  TypeErr or("siz e must  be a ui nt32")
                   if (v  + w >  O || v  > p) th row new  RangeE rror("b uffer t oo smal l")
              }
              funct ion s(v , w, O,  \$) {
                   if (!( g.isBuf fer(v)  || v in stanceo f rr.Ui nt8Arra y)) thr ow new  TypeErr or('"bu f" argu ment mu st be a  Buffer  or Uin t8Array ')
                  if  (typeo f w ==  "functi on") (\$  = w),  (w = 0) , (O =  v.lengt h)
                  el se if ( typeof  O == "f unction ") (\$ =  O), (O  = v.le ngth -  w)
                  el se if ( typeof  \$ != "f unction ") thro w new T ypeErro r('"cb"  argume nt must  be a f unction ')
                  re turn n( w, v.le ngth),  i(O, w,  v.leng th), u( v, w, O , \$)
              }
              func tion u( v, w, O , \$) {
                   if (( (w = ne w Uint8 Array(v .buffer , w, O) ), a.ge tRandom Values( w), \$)) 
                       Hn(func tion ()  {
                           \$ (null,  v)
                       })
                   else re turn v
              }
              fu nction  l(v, w,  O) {
                   if ((t ypeof w  > "u"  && (w =  0), !( g.isBuf fer(v)  || v in stanceo f rr.Ui nt8Arra y))) th row new  TypeEr ror('"b uf" arg ument m ust be  a Buffe r or Ui nt8Arra y')
                  r eturn n (w, v.l ength),  O ===  void 0  && (O =  v.leng th - w) , i(O,  w, v.le ngth),  u(v, w,  O)
              }
              var g  = Jn.B uffer,
                   p = J n.kMaxL ength,
                   a = r r.crypt o || rr .msCryp to,
                  y  = Math .pow(2,  32) -  1
              a && a. getRand omValue s ? ((e .random Fill =  s), (e. randomF illSync  = l))  : ((e.r andomFi ll = r) , (e.ra ndomFil lSync =  r))
         } ),
         ps  = Lr(fu nction  (t) {
              t.e xports  = cs
         } ).rando mFillSy nc,
         as  = Math .floor( 0.001 *  (Date. now() -  perfor mance.n ow()))
     fun ction w t(t) {
          if (ty peof t  != "str ing") t hrow ne w TypeE rror("P ath mus t be a  string.  Receiv ed " +  JSON.st ringify (t))
     }
     functi on Zn(t , e) {
          for (v ar r =  "", n =  0, i =  -1, s  = 0, u,  l = 0;  l <= t .length ; ++l)  {
              if (l <  t.leng th) u =  t.char CodeAt( l)
              else { 
                  if ( u === 4 7) brea k
                  u =  47
              }
              if (u  === 47 ) {
                  i f (i != = l - 1  && s ! == 1)
                       if  (i !==  l - 1  && s == = 2) {
                            if ( 2 > r.l ength | | n !==  2 || r .charCo deAt(r. length  - 1) != = 46 ||  r.char CodeAt( r.lengt h - 2)  !== 46)  {
                                if ( 2 < r.l ength)  {
                                    i f (((i  = r.las tIndexO f("/")) , i !==  r.leng th - 1) ) {
                                         i  === -1  ? ((r =  ""), ( n = 0))  : ((r  = r.sli ce(0, i )), (n  = r.len gth - 1  - r.la stIndex Of("/") )), (i  = l), ( s = 0)
                                          contin ue
                                     }
                                } els e if (r .length  === 2  || r.le ngth == = 1) {
                                     ;(r  = ""),  (n = 0 ), (i =  l), (s  = 0)
                                     cont inue
                                }
                            }
                            e && ( (r = 0  < r.len gth ? r  + "/.. " : ".. "), (n  = 2))
                       }  else (r  = 0 <  r.lengt h ? r +  ("/" +  t.slic e(i + 1 , l)) :  t.slic e(i + 1 , l)),  (n = l  - i - 1 )
                  ;(i  = l),  (s = 0) 
             }  else u  === 46  && s ! == -1 ?  ++s :  (s = -1 )
         }
         r eturn r 
    }
     var  Le = { 
             r esolve:  functi on () { 
                  for  (var t  = "", e  = !1,  r, n =  argumen ts.leng th - 1;  -1 <=  n && !e ; n--)  {
                       if (0  <= n) v ar i =  argumen ts[n]
                       el se r == = void  0 && (r  = ls.c wd()),  (i = r) 
                       wt(i),  i.lengt h !== 0  && ((t  = i +  "/" + t ), (e =  i.char CodeAt( 0) ===  47))
                   }
                  ret urn (t  = Zn(t,  !e)),  e ? (0  < t.len gth ? " /" + t  : "/")  : 0 < t .length  ? t :  "."
              },
              norm alize:  functio n (t) { 
                  if ( (wt(t),  t.leng th ===  0)) ret urn "." 
                  var  e = t.c harCode At(0) = == 47,
                       r  = t.ch arCodeA t(t.len gth - 1 ) === 4 7
                  ret urn (t  = Zn(t,  !e)),  t.lengt h !== 0  || e | | (t =  "."), 0  < t.le ngth &&  r && ( t += "/ "), e ?  "/" +  t : t
              },
              is Absolut e: func tion (t ) {
                  r eturn w t(t), 0  < t.le ngth &&  t.char CodeAt( 0) ===  47
              },
              join:  functi on () { 
                  if ( argumen ts.leng th ===  0) retu rn "."
                   for ( var t,  e = 0;  e < arg uments. length;  ++e) { 
                       var r =  argume nts[e]
                       w t(r), 0  < r.le ngth &&  (t = t  === vo id 0 ?  r : t +  ("/" +  r))
                   }
                  ret urn t = == void  0 ? ". " : Le. normali ze(t)
              },
              re lative:  functi on (t,  e) {
                   if ((wt (t), wt (e), t  === e | | ((t =  Le.res olve(t) ), (e =  Le.res olve(e) ), t == = e)))  return  ""
                  fo r (var  r = 1;  r < t.l ength & & t.cha rCodeAt (r) ===  47; ++ r);
                  f or (var  n = t. length,  i = n  - r, s  = 1; s  < e.len gth &&  e.charC odeAt(s ) === 4 7; ++s) ;
                  for  (var u  = e.le ngth -  s, l =  i < u ?  i : u,  g = -1 , p = 0 ; p <=  l; ++p)  {
                       if (p  === l)  {
                           i f (u >  l) {
                                if  (e.cha rCodeAt (s + p)  === 47 ) retur n e.sli ce(s +  p + 1)
                                 if (p = == 0) r eturn e .slice( s + p)
                            } el se i >  l && (t .charCo deAt(r  + p) == = 47 ?  (g = p)  : p == = 0 &&  (g = 0) )
                           br eak
                       }
                       var  a = t. charCod eAt(r +  p),
                            y = e. charCod eAt(s +  p)
                       if ( a !== y ) break 
                       a === 4 7 && (g  = p)
                   }
                  fo r (i =  "", p =  r + g  + 1; p  <= n; + +p) (p  === n | | t.cha rCodeAt (p) ===  47) &&  (i = i .length  === 0  ? i + " .." : i  + "/.. ")
                  re turn 0  < i.len gth ? i  + e.sl ice(s +  g) : ( (s += g ), e.ch arCodeA t(s) == = 47 &&  ++s, e .slice( s))
              },
              _mak eLong:  functio n (t) { 
                  retu rn t
              },
              dir name: f unction  (t) {
                   if (( wt(t),  t.lengt h === 0 )) retu rn "."
                   for ( var e =  t.char CodeAt( 0), r =  e ===  47, n =  -1, i  = !0, s  = t.le ngth -  1; 1 <=  s; --s )
                       if ((( e = t.c harCode At(s)),  e ===  47)) {
                            if ( !i) {
                                n  = s
                                br eak
                            }
                       } else  i = !1 
                  retu rn n == = -1 ?  (r ? "/ " : "." ) : r & & n ===  1 ? "/ /" : t. slice(0 , n)
              },
              bas ename:  functio n (t, e ) {
                  i f (e != = void  0 && ty peof e  != "str ing") t hrow ne w TypeE rror('" ext" ar gument  must be  a stri ng')
                   wt(t)
                   var r  = 0,
                       n =  -1,
                       i =  !0,
                       s
                   if (e  !== voi d 0 &&  0 < e.l ength & & e.len gth <=  t.lengt h) {
                       if  (e.leng th ===  t.lengt h && e  === t)  return  ""
                       var u  = e.le ngth -  1,
                           l  = -1
                       fo r (s =  t.lengt h - 1;  0 <= s;  --s) { 
                           var  g = t. charCod eAt(s)
                            if ( g === 4 7) {
                                if  (!i) { 
                                    r  = s + 1 
                                    br eak
                                }
                            } els e l ===  -1 &&  ((i = ! 1), (l  = s + 1 )), 0 < = u &&  (g ===  e.charC odeAt(u ) ? --u  === -1  && (n  = s) :  ((u = - 1), (n  = l)))
                       } 
                       return  r === n  ? (n =  l) : n  === -1  && (n  = t.len gth), t .slice( r, n)
                   }
                  fo r (s =  t.lengt h - 1;  0 <= s;  --s)
                       if  (t.cha rCodeAt (s) ===  47) {
                            if ( !i) {
                                r  = s +  1
                                break 
                           }
                       }  else n  === -1  && ((i  = !1),  (n = s  + 1))
                   return  n ===  -1 ? ""  : t.sl ice(r,  n)
              },
              extna me: fun ction ( t) {
                   wt(t)
                   for (v ar e =  -1, r =  0, n =  -1, i  = !0, s  = 0, u  = t.le ngth -  1; 0 <=  u; --u ) {
                       var  l = t.c harCode At(u)
                       if  (l ===  47) {
                            if ( !i) {
                                r  = u +  1
                                break 
                           }
                       }  else n  === -1  && ((i  = !1),  (n = u  + 1)),  l === 4 6 ? (e  === -1  ? (e =  u) : s  !== 1 & & (s =  1)) : e  !== -1  && (s  = -1)
                   }
                  re turn e  === -1  || n == = -1 ||  s ===  0 || (s  === 1  && e == = n - 1  && e = == r +  1) ? ""  : t.sl ice(e,  n)
              },
              forma t: func tion (t ) {
                  i f (t == = null  || type of t !=  "objec t") thr ow new  TypeErr or('The  "pathO bject"  argumen t must  be of t ype Obj ect. Re ceived  type '  + typeo f t)
                   var e =  t.dir  || t.ro ot,
                       r =  t.base  || (t.n ame ||  "") + ( t.ext | | "")
                   return  (t = e  ? (e = == t.ro ot ? e  + r : e  + "/"  + r) :  r), t
              },
              pa rse: fu nction  (t) {
                   wt(t)
                   var e  = { ro ot: "",  dir: " ", base : "", e xt: "",  name:  "" }
                   if (t.l ength = == 0) r eturn e 
                  var  r = t.c harCode At(0),
                       n  = r == = 47
                   if (n)  {
                       e.root  = "/"
                       v ar i =  1
                  } e lse i =  0
                  fo r (var  s = -1,  u = 0,  l = -1 , g = ! 0, p =  t.lengt h - 1,  a = 0;  p >= i;  --p)
                       if  (((r =  t.char CodeAt( p)), r  === 47) ) {
                            if (!g)  {
                                u =  p + 1
                                b reak
                            }
                       } els e l ===  -1 &&  ((g = ! 1), (l  = p + 1 )), r = == 46 ?  (s ===  -1 ? ( s = p)  : a !==  1 && ( a = 1))  : s != = -1 &&  (a = - 1)
                  re turn s  === -1  || l == = -1 ||  a ===  0 || (a  === 1  && s == = l - 1  && s = == u +  1) ? l  !== -1  && (e.b ase = u  === 0  && n ?  (e.name  = t.sl ice(1,  l)) : ( e.name  = t.sli ce(u, l ))) : ( u === 0  && n ?  ((e.na me = t. slice(1 , s)),  (e.base  = t.sl ice(1,  l))) :  ((e.nam e = t.s lice(u,  s)), ( e.base  = t.sli ce(u, l ))), (e .ext =  t.slice (s, l)) ), 0 <  u ? (e. dir = t .slice( 0, u -  1)) : n  && (e. dir = " /"), e
              }, 
             s ep: "/" ,
              delimit er: ":" ,
              win32:  null,
              pos ix: nul l,
         },
          Qn = ( Le.posi x = Le) ,
         ys =  Object .freeze ({ __pr oto__:  null, d efault:  Qn, __ moduleE xports:  Qn }), 
         bn =  {
              hrtime:  (funct ion (t)  {
                  re turn fu nction  (e) {
                       re turn (e  = t(e) ), 1e9  * e[0]  + e[1]
                   }
              })(fu nction  (t) {
                   var e  = 0.001  * perf ormance .now(), 
                       r = Mat h.floor (e) + a s
                  ret urn (e  = Math. floor(( e % 1)  * 1e9)) , t &&  ((r -=  t[0]),  (e -= t [1]), 0  > e &&  (r--,  (e += 1 e9))),  [r, e]
              }) ,
              exit: f unction  (t) {
                   throw  new fi (t)
              },
              kill : funct ion (t)  {
                  th row new  Es(t)
              }, 
             r andomFi llSync:  ps,
              isTT Y: func tion ()  {
                  re turn !0 
             } ,
              path: y s,
              fs: nu ll,
         }, 
         Y,
         Z t = T(1 ),
         Mt  = T(2), 
         pe =  T(4),
          ae = T( 8),
         xt  = T(16 ),
         Pr  = T(32) ,
         jt =  T(64), 
         ye =  T(128), 
         ir =  T(256), 
         Cr =  T(512), 
         Br =  T(1024) ,
         Fr =  T(2048 ),
         Ur  = T(409 6),
         or  = T(81 92),
         s r = T(1 6384),
          Dr = T (32768) ,
         Mr =  T(6553 6),
         xr  = T(13 1072),
          jr = T (262144 ),
         Yr  = T(524 288),
          \$r = T( 1048576 ),
         Yt  = T(209 7152),
          ur = T (419430 4),
         fr  = T(83 88608), 
         Wr =  T(16777 216),
          Gr = T( 3355443 2),
         zr  = T(67 108864) ,
         Qt =  T(1342 17728), 
         ti =  T(26843 5456),
          ge = Z t | Mt  | pe |  ae | xt  | Pr |  jt | y e | ir  | Cr |  Br | Fr  | Ur |  or | s r | Dr  | Mr |  xr | jr  | Yr |  \$r | Y t | fr  | ur |  Wr | zr  | Gr |  Qt | t i,
         ei  = Zt |  Mt | pe  | ae |  xt | P r | jt  | ye |  ir | Yt  | ur |  fr | Q t,
         gs  = T(0), 
         Vr =  ae | xt  | ye |  Cr | B r | Fr  | Ur |  or | sr  | Dr |  Mr | x r | jr  | Yr |  \$r | Yt  | fr |  Wr | z r | Gr  | Qt,
          ri = Vr  | ei,
          ni = M t | ae  | jt |  Yt | Qt  | ti,
          ds = M t | ae  | jt |  Yt | Qt ,
         ms =  T(0),
          vs = {  E2BIG:  1, EAC CES: 2,  EADDRI NUSE: 3 , EADDR NOTAVAI L: 4, E AFNOSUP PORT: 5 , EALRE ADY: 7,  EAGAIN : 6, EB ADF: 8,  EBADMS G: 9, E BUSY: 1 0, ECAN CELED:  11, ECH ILD: 12 , ECONN ABORTED : 13, E CONNREF USED: 1 4, ECON NRESET:  15, ED EADLOCK : 16, E DESTADD RREQ: 1 7, EDOM : 18, E DQUOT:  19, EEX IST: 20 , EFAUL T: 21,  EFBIG:  22, EHO STDOWN:  23, EH OSTUNRE ACH: 23 , EIDRM : 24, E ILSEQ:  25, EIN PROGRES S: 26,  EINTR:  27, EIN VAL: 28 , EIO:  29, EIS CONN: 3 0, EISD IR: 31,  ELOOP:  32, EM FILE: 3 3, EMLI NK: 34,  EMSGSI ZE: 35,  EMULTI HOP: 36 , ENAME TOOLONG : 37, E NETDOWN : 38, E NETRESE T: 39,  ENETUNR EACH: 4 0, ENFI LE: 41,  ENOBUF S: 42,  ENODEV:  43, EN OENT: 4 4, ENOE XEC: 45 , ENOLC K: 46,  ENOLINK : 47, E NOMEM:  48, ENO MSG: 49 , ENOPR OTOOPT:  50, EN OSPC: 5 1, ENOS YS: 52,  ENOTCO NN: 53,  ENOTDI R: 54,  ENOTEMP TY: 55,  ENOTRE COVERAB LE: 56,  ENOTSO CK: 57,  ENOTTY : 59, E NXIO: 6 0, EOVE RFLOW:  61, EOW NERDEAD : 62, E PERM: 6 3, EPIP E: 64,  EPROTO:  65, EP ROTONOS UPPORT:  66, EP ROTOTYP E: 67,  ERANGE:  68, ER OFS: 69 , ESPIP E: 70,  ESRCH:  71, EST ALE: 72 , ETIME DOUT: 7 3, ETXT BSY: 74 , EXDEV : 75 }, 
         ii =  ((Y = { }), (Y[ 6] = "S IGHUP") , (Y[8]  = "SIG INT"),  (Y[11]  = "SIGQ UIT"),  (Y[7] =  "SIGIL L"), (Y [15] =  "SIGTRA P"), (Y [0] = " SIGABRT "), (Y[ 2] = "S IGBUS") , (Y[5]  = "SIG FPE"),  (Y[9] =  "SIGKI LL"), ( Y[20] =  "SIGUS R1"), ( Y[12] =  "SIGSE GV"), ( Y[21] =  "SIGUS R2"), ( Y[10] =  "SIGPI PE"), ( Y[1] =  "SIGALR M"), (Y [14] =  "SIGTER M"), (Y [3] = " SIGCHLD "), (Y[ 4] = "S IGCONT" ), (Y[1 3] = "S IGSTOP" ), (Y[1 6] = "S IGTSTP" ), (Y[1 7] = "S IGTTIN" ), (Y[1 8] = "S IGTTOU" ), (Y[1 9] = "S IGURG") , (Y[23 ] = "SI GXCPU") , (Y[24 ] = "SI GXFSZ") , (Y[22 ] = "SI GVTALRM "), Y), 
         ws =  Zt | Mt  | xt |  ye | Y t | Qt, 
         oi =  Zt | jt  | xt |  ye | Y t | Qt
     fun ction b t(t) {
          var e  = Math. trunc(t )
         retu rn (t =  T(Math .round( 1e6 * ( t - e)) )), T(e ) * T(1 e6) + t 
    }
     fun ction d e(t) {
          return  typeof  t == " number"  && (t  = Math. trunc(t )), (t  = T(t)) , Numbe r(t / T (1e6))
     }
     func tion x( t) {
         r eturn f unction  () {
              for  (var e  = [],  r = 0;  r < arg uments. length;  r++) e [r] = a rgument s[r]
              try  {
                  ret urn t.a pply(vo id 0, K e(e))
              } c atch (n ) {
                  i f (n &&  n.code  && typ eof n.c ode ==  "string ") retu rn vs[n .code]  || 28
                   if (n  instanc eof qr)  return  n.errn o
                  thr ow n
              }
         } 
    }
     fun ction s i(t, e)  {
         var  r = t. FD_MAP. get(e)
          if (!r ) throw  new qr (8)
         if  (r.fil etype = == void  0) {
              var  n = t. binding s.fs.fs tatSync (r.real )
              ;(t = u i(t, e,  n)), ( e = t.r ightsBa se), (n  = t.ri ghtsInh eriting ), (r.f iletype  = t.fi letype) , r.rig hts ||  (r.righ ts = {  base: e , inher iting:  n })
         } 
         retur n r
     }
     functio n ui(t,  e, r)  {
         swit ch (!0)  {
              case r .isBloc kDevice ():
                  r eturn {  filety pe: 1,  rightsB ase: ge , right sInheri ting: g e }
              case  r.isCha racterD evice() :
                  ret urn e ! == void  0 && t .bindin gs.isTT Y(e) ?  { filet ype: 2,  rights Base: d s, righ tsInher iting:  ms } :  { filet ype: 2,  rights Base: g e, righ tsInher iting:  ge }
              case  r.isDi rectory ():
                  r eturn {  filety pe: 3,  rightsB ase: Vr , right sInheri ting: r i }
              case  r.isFIF O():
                   return  { filet ype: 6,  rights Base: n i, righ tsInher iting:  ge }
              case  r.isFi le():
                   return  { file type: 4 , right sBase:  ei, rig htsInhe riting:  gs }
              cas e r.isS ocket() :
                  ret urn { f iletype : 6, ri ghtsBas e: ni,  rightsI nheriti ng: ge  }
              case r. isSymbo licLink ():
                  r eturn {  filety pe: 7,  rightsB ase: T( 0), rig htsInhe riting:  T(0) } 
             d efault: 
                  retu rn { fi letype:  0, rig htsBase : T(0),  rights Inherit ing: T( 0) }
         } 
    }
     var  qr = ( functio n (t) { 
             f unction  e(r) { 
                  var  n = t.c all(thi s) || t his
                  r eturn ( n.errno  = r),  Object. setProt otypeOf (n, e.p rototyp e), n
              }
              ret urn Or( e, t),  e
         })(E rror),
          fi = ( functio n (t) { 
             f unction  e(r) { 
                  var  n = t.c all(thi s, "WAS I Exit  error:  " + r)  || this 
                  retu rn (n.c ode = r ), Obje ct.setP rototyp eOf(n,  e.proto type),  n
              }
              return  Or(e, t ), e
         } )(Error ),
         Es  = (func tion (t ) {
              funct ion e(r ) {
                  v ar n =  t.call( this, " WASI Ki ll sign al: " +  r) ||  this
                   return  (n.sign al = r) , Objec t.setPr ototype Of(n, e .protot ype), n 
             } 
             r eturn O r(e, t) , e
         }) (Error) ,
         hi =  (funct ion ()  {
              functio n t(e)  {
                  fun ction r (m) {
                       sw itch (m ) {
                            case 1: 
                                return  a.hrti me()
                            case 0 :
                                retur n bt(Da te.now( ))
                           c ase 2:
                            case  3:
                                ret urn a.h rtime()  - gt
                            defau lt:
                                ret urn nul l
                       }
                  }
                   funct ion n(m , E) {
                       i f (((m  = si(u,  m)), E  !== T( 0) && ( m.right s.base  & E) == = T(0)) ) throw  new qr (63)
                       ret urn m
                   }
                  fu nction  i(m, E)  {
                       retur n (
                            u.refre shMemor y(),
                            Array. from({  length:  E }, f unction  (A, I)  {
                                retu rn (I =  m + 8  * I), ( A = u.v iew.get Uint32( I, !0)) , (I =  u.view. getUint 32(I +  4, !0)) , new U int8Arr ay(u.me mory.bu ffer, A , I)
                            })
                       )
                   }
                  var  s,
                       u =  this,
                       l  = {}
                   e && e. preopen s ? (l  = e.pre opens)  : e &&  e.preop enDirec tories  && (l =  e.preo penDire ctories )
                  var  g = {} 
                  e &&  e.env  && (g =  e.env) 
                  var  p = []
                   e &&  e.args  && (p =  e.args )
                  var  a = bn 
                  e &&  e.bind ings &&  (a = e .bindin gs),
                       (th is.view  = this .memory  = void  0),
                       (th is.bind ings =  a),
                       (thi s.FD_MA P = new  Map([
                            [0,  { real:  0, fil etype:  2, righ ts: { b ase: ws , inher iting:  T(0) },  path:  void 0  }],
                            [1, { r eal: 1,  filety pe: 2,  rights:  { base : oi, i nheriti ng: T(0 ) }, pa th: voi d 0 }], 
                           [2,  { real : 2, fi letype:  2, rig hts: {  base: o i, inhe riting:  T(0) } , path:  void 0  }],
                       ])) 
                  var  y = thi s.bindi ngs.fs, 
                       v = thi s.bindi ngs.pat h
                  try  {
                       for ( var w =  Ve(Obj ect.ent ries(l) ), O =  w.next( ); !O.d one; O  = w.nex t()) {
                            var  \$ = qe( O.value , 2),
                                T t = \$[0 ],
                                Bt =  \$[1],
                                 ue = y. openSyn c(Bt, y .consta nts.O_R DONLY), 
                                rt = K e(this. FD_MAP. keys()) .revers e()[0]  + 1
                            this.FD _MAP.se t(rt, {  real:  ue, fil etype:  3, righ ts: { b ase: Vr , inher iting:  ri }, f akePath : Tt, p ath: Bt  })
                       }
                   } catch  (m) {
                       v ar qt =  { erro r: m }
                   } fin ally {
                       t ry {
                            O && ! O.done  && (s =  w.retu rn) &&  s.call( w)
                       } fin ally {
                            if ( qt) thr ow qt.e rror
                       }
                   }
                  va r gt =  a.hrtim e()
                  ; (this.w asiImpo rt = {
                       a rgs_get : funct ion (m,  E) {
                            u.ref reshMem ory()
                            var A  = m,
                                I  = E
                            return  (
                                p.fo rEach(f unction  (k) {
                                     u.v iew.set Uint32( A, I, ! 0), (A  += 4),  (I += z .from(u .memory .buffer ).write (k + "\\ 0", I)) 
                                }),
                                0
                            )
                       },
                       a rgs_siz es_get:  functi on (m,  E) {
                            return  (
                                u.re freshMe mory(), 
                                u.view .setUin t32(m,  p.lengt h, !0), 
                                (m = p .reduce (functi on (A,  I) {
                                     retur n A + z .byteLe ngth(I)  + 1
                                },  0)),
                                u .view.s etUint3 2(E, m,  !0),
                                0 
                           )
                       }, 
                       environ _get: f unction  (m, E)  {
                           u .refres hMemory ()
                           v ar A =  m,
                                I =  E
                           re turn (
                                 Object. entries (g).for Each(fu nction  (k) {
                                     var  L = qe( k, 2)
                                     ;(k  = L[0]) , (L =  L[1]),  u.view. setUint 32(A, I , !0),  (A += 4 ), (I + = z.fro m(u.mem ory.buf fer).wr ite(k +  "=" +  L + "\\0 ", I))
                                 }),
                                0
                            )
                       },
                       en viron_s izes_ge t: func tion (m , E) {
                            u.re freshMe mory()
                            var  A = Obj ect.ent ries(g) .map(fu nction  (k) {
                                     retu rn (k =  qe(k,  2)), k[ 0] + "= " + k[1 ] + "\\0 "
                                }),
                                I  = A.re duce(fu nction  (k, L)  {
                                    r eturn k  + z.by teLengt h(L)
                                },  0)
                            return  u.view. setUint 32(m, A .length , !0),  u.view. setUint 32(E, I , !0),  0
                       },
                       cloc k_res_g et: fun ction ( m, E) { 
                           swi tch (m)  {
                                case  1:
                                cas e 2:
                                ca se 3:
                                     var  A = T(1 )
                                    b reak
                                ca se 0:
                                     A =  T(1e3)
                            }
                            return  u.view .setBig Uint64( E, A),  0
                       },
                       cloc k_time_ get: fu nction  (m, E,  A) {
                            return  u.refr eshMemo ry(), ( m = r(m )), m = == null  ? 28 :  (u.vie w.setBi gUint64 (A, T(m ), !0),  0)
                       },
                       fd _advise : x(fun ction ( m) {
                            return  n(m, y e), 52
                       } ),
                       fd_al locate:  x(func tion (m ) {
                            return  n(m, ir ), 52
                       }) ,
                       fd_clo se: x(f unction  (m) {
                            var  E = n(m , T(0)) 
                           ret urn y.c loseSyn c(E.rea l), u.F D_MAP.d elete(m ), 0
                       }), 
                       fd_data sync: x (functi on (m)  {
                           re turn (m  = n(m,  Zt)),  y.fdata syncSyn c(m.rea l), 0
                       }) ,
                       fd_fds tat_get : x(fun ction ( m, E) { 
                           ret urn (m  = n(m,  T(0))),  u.refr eshMemo ry(), u .view.s etUint8 (E, m.f iletype ), u.vi ew.setU int16(E  + 2, 0 , !0),  u.view. setUint 16(E +  4, 0, ! 0), u.v iew.set BigUint 64(E +  8, T(m. rights. base),  !0), u. view.se tBigUin t64(E +  8 + 8,  T(m.ri ghts.in heritin g), !0) , 0
                       }),
                       f d_fdsta t_set_f lags: x (functi on (m)  {
                           re turn n( m, ae),  52
                       }),
                       f d_fdsta t_set_r ights:  x(funct ion (m,  E, A)  {
                           re turn (m  = n(m,  T(0))) , (m.ri ghts.ba se | E)  > m.ri ghts.ba se || ( m.right s.inher iting |  A) > m .rights .inheri ting ?  63 : (( m.right s.base  = E), ( m.right s.inher iting =  A), 0) 
                       }),
                       fd_f ilestat _get: x (functi on (m,  E) {
                            m = n( m, Yt)
                            var  A = y.f statSyn c(m.rea l)
                           r eturn u .refres hMemory (), u.v iew.set BigUint 64(E, T (A.dev) , !0),  (E += 8 ), u.vi ew.setB igUint6 4(E, T( A.ino),  !0), ( E += 8) , u.vie w.setUi nt8(E,  m.filet ype), ( E += 8) , u.vie w.setBi gUint64 (E, T(A .nlink) , !0),  (E += 8 ), u.vi ew.setB igUint6 4(E, T( A.size) , !0),  (E += 8 ), u.vi ew.setB igUint6 4(E, bt (A.atim eMs), ! 0), (E  += 8),  u.view. setBigU int64(E , bt(A. mtimeMs ), !0),  u.view .setBig Uint64( E + 8,  bt(A.ct imeMs),  !0), 0 
                       }),
                       fd_f ilestat _set_si ze: x(f unction  (m, E)  {
                           r eturn ( m = n(m , ur)),  y.ftru ncateSy nc(m.re al, Num ber(E)) , 0
                       }),
                       f d_files tat_set _times:  x(func tion (m , E, A,  I) {
                            m = n (m, fr) 
                           var  k = y. fstatSy nc(m.re al),
                                L  = k.ati me
                           k  = k.mt ime
                            var C =  de(r(0 ))
                           r eturn ( I & 3)  === 3 | | (I &  12) ===  12 ? 2 8 : ((I  & 1) = == 1 ?  (L = de (E)) :  (I & 2)  === 2  && (L =  C), (I  & 4) = == 4 ?  (k = de (A)) :  (I & 8)  === 8  && (k =  C), y. futimes Sync(m. real, n ew Date (L), ne w Date( k)), 0) 
                       }),
                       fd_p restat_ get: x( functio n (m, E ) {
                            return  (m = n( m, T(0) )), m.p ath ? ( u.refre shMemor y(), u. view.se tUint8( E, 0),  u.view. setUint 32(E +  4, z.by teLengt h(m.fak ePath),  !0), 0 ) : 28
                       } ),
                       fd_pr estat_d ir_name : x(fun ction ( m, E, A ) {
                            return  (m = n( m, T(0) )), m.p ath ? ( u.refre shMemor y(), z. from(u. memory. buffer) .write( m.fakeP ath, E,  A, "ut f8"), 0 ) : 28
                       } ),
                       fd_pw rite: x (functi on (m,  E, A, I , k) {
                            var  L = n(m , jt |  pe),
                                C  = 0
                            return  (
                                i(E,  A).forE ach(fun ction ( B) {
                                     for ( var P =  0; P <  B.byte Length;  ) P +=  y.writ eSync(L .real,  B, P, B .byteLe ngth -  P, Numb er(I) +  C + P) 
                                    C  += P
                                }) ,
                                u.vie w.setUi nt32(k,  C, !0) ,
                                0
                            )
                       }),
                       fd_ write:  x(funct ion (m,  E, A,  I) {
                            var k  = n(m,  jt),
                                L  = 0
                            return  (
                                i(E,  A).forE ach(fun ction ( C) {
                                     for ( var B =  0; B <  C.byte Length;  ) {
                                         v ar P =  y.write Sync(k. real, C , B, C. byteLen gth - B , k.off set ? N umber(k .offset ) : nul l)
                                         k.o ffset & & (k.of fset +=  T(P)),  (B +=  P)
                                     }
                                    L  += B
                                } ),
                                u.vi ew.setU int32(I , L, !0 ),
                                0
                            )
                       }),
                       fd _pread:  x(func tion (m , E, A,  I, k)  {
                           va r L
                            m = n(m , Mt |  pe)
                            var C =  0
                           t ry {
                                va r B = V e(i(E,  A)),
                                     P = B .next() 
                                t: for  (; !P. done; P  = B.ne xt()) { 
                                    va r D = P .value
                                     for  (E = 0 ; E < D .byteLe ngth; )  {
                                         var  M = D. byteLen gth - E ,
                                              W = y.r eadSync (m.real , D, E,  D.byte Length  - E, Nu mber(I)  + C +  E)
                                         if  (((E +=  W), (C  += W),  W ===  0 || W  < M)) b reak t
                                     }
                                     C +=  E
                                }
                            } catc h (J) { 
                                var X  = { err or: J } 
                           } f inally  {
                                try { 
                                    P  && !P.d one &&  (L = B. return)  && L.c all(B)
                                 } final ly {
                                     if (X ) throw  X.erro r
                                }
                            }
                           re turn u. view.se tUint32 (k, C,  !0), 0
                       } ),
                       fd_re ad: x(f unction  (m, E,  A, I)  {
                           va r k
                            m = n(m , Mt)
                            var L  = m.re al ===  0,
                                C =  0
                           tr y {
                                var  B = Ve (i(E, A )),
                                     P = B. next()
                                 t: for  (; !P.d one; P  = B.nex t()) {
                                     var  D = P. value
                                     for  (E = 0;  E < D. byteLen gth; )  {
                                         var  M = D.b yteLeng th - E, 
                                             W  = y.re adSync( m.real,  D, E,  M, L ||  m.offs et ===  void 0  ? null  : Numbe r(m.off set))
                                          if ((L  || (m.o ffset =  (m.off set ? m .offset  : T(0) ) + T(W )), (E  += W),  (C += W ), W == = 0 ||  W < M))  break  t
                                    } 
                                }
                           }  catch  (J) {
                                v ar X =  { error : J }
                            } fin ally {
                                 try {
                                     P &&  !P.don e && (k  = B.re turn) & & k.cal l(B)
                                }  finally  {
                                     if (X)  throw X .error
                                 }
                           }
                            retu rn u.vi ew.setU int32(I , C, !0 ), 0
                       }), 
                       fd_read dir: x( functio n (m, E , A, I,  k) {
                            ;(m =  n(m, s r)), u. refresh Memory( )
                           va r L = y .readdi rSync(m .path,  { withF ileType s: !0 } ),
                                C =  E
                           fo r (I =  Number( I); I <  L.leng th; I + = 1) {
                                 var B =  L[I],
                                     P =  z.byte Length( B.name) 
                                if (E  - C > A  || (u. view.se tBigUin t64(E,  T(I + 1 ), !0),  (E +=  8), E -  C > A) ) break 
                                var D  = y.sta tSync(v .resolv e(m.pat h, B.na me))
                                if  ((u.vi ew.setB igUint6 4(E, T( D.ino),  !0), ( E += 8) , E - C  > A ||  (u.vie w.setUi nt32(E,  P, !0) , (E +=  4), E  - C > A ))) bre ak
                                swit ch (!0)  {
                                     case D. isBlock Device( ):
                                         D =  1
                                         bre ak
                                     case D. isChara cterDev ice():
                                          D = 2
                                          break
                                     cas e D.isD irector y():
                                         D  = 3
                                         b reak
                                     case  D.isFIF O():
                                         D  = 6
                                         b reak
                                     case  D.isFil e():
                                         D  = 4
                                         b reak
                                     case  D.isSoc ket():
                                          D = 6
                                          break
                                     cas e D.isS ymbolic Link(): 
                                         D = 7 
                                         break 
                                    de fault:
                                          D = 0
                                 }
                                if (( u.view. setUint 8(E, D) , (E +=  1), (E  += 3),  E + P  >= C +  A)) bre ak
                                z.fr om(u.me mory.bu ffer).w rite(B. name, E ), (E + = P)
                            }
                           r eturn u .view.s etUint3 2(k, Ma th.min( E - C,  A), !0) , 0
                       }),
                       f d_renum ber: x( functio n (m, E ) {
                            return  n(m, T( 0)), n( E, T(0) ), y.cl oseSync (u.FD_M AP.get( m).real ), u.FD _MAP.se t(m, u. FD_MAP. get(E)) , u.FD_ MAP.del ete(E),  0
                       }),
                       fd _seek:  x(funct ion (m,  E, A,  I) {
                            switch  (((m =  n(m, p e)), u. refresh Memory( ), A))  {
                                case  1:
                                     m.offse t = (m. offset  ? m.off set : T (0)) +  T(E)
                                     break 
                                case 2 :
                                    ; (A = y. fstatSy nc(m.re al).siz e), (m. offset  = T(A)  + T(E)) 
                                    br eak
                                cas e 0:
                                     m.off set = T (E)
                            }
                           re turn u. view.se tBigUin t64(I,  m.offse t, !0),  0
                       }),
                       fd _tell:  x(funct ion (m,  E) {
                            retur n (m =  n(m, Pr )), u.r efreshM emory() , m.off set ||  (m.offs et = T( 0)), u. view.se tBigUin t64(E,  m.offse t, !0),  0
                       }),
                       fd _sync:  x(funct ion (m)  {
                           r eturn ( m = n(m , xt)),  y.fsyn cSync(m .real),  0
                       }),
                       pa th_crea te_dire ctory:  x(funct ion (m,  E, A)  {
                           re turn (m  = n(m,  Cr)),  m.path  ? (u.re freshMe mory(),  (E = z .from(u .memory .buffer , E, A) .toStri ng()),  y.mkdir Sync(v. resolve (m.path , E)),  0) : 28 
                       }),
                       path _filest at_get:  x(func tion (m , E, A,  I, k)  {
                           re turn (m  = n(m,  jr)),  m.path  ? (u.re freshMe mory(),  (A = z .from(u .memory .buffer , A, I) .toStri ng()),  (A = y. statSyn c(v.res olve(m. path, A ))), u. view.se tBigUin t64(k,  T(A.dev ), !0),  (k +=  8), u.v iew.set BigUint 64(k, T (A.ino) , !0),  (k += 8 ), u.vi ew.setU int8(k,  ui(u,  void 0,  A).fil etype),  (k +=  8), u.v iew.set BigUint 64(k, T (A.nlin k), !0) , (k +=  8), u. view.se tBigUin t64(k,  T(A.siz e), !0) , (k +=  8), u. view.se tBigUin t64(k,  bt(A.at imeMs),  !0), ( k += 8) , u.vie w.setBi gUint64 (k, bt( A.mtime Ms), !0 ), u.vi ew.setB igUint6 4(k + 8 , bt(A. ctimeMs ), !0),  0) : 2 8
                       }),
                       pat h_files tat_set _times:  x(func tion (m , E, A,  I, k,  L, C) { 
                           if  (((m =  n(m, \$r )), !m. path))  return  28
                           u .refres hMemory ()
                           v ar B =  y.fstat Sync(m. real)
                            ;(E =  B.atim e), (B  = B.mti me)
                            var P =  de(r(0 ))
                           r eturn ( C & 3)  === 3 | | (C &  12) ===  12 ? 2 8 : ((C  & 1) = == 1 ?  (E = de (k)) :  (C & 2)  === 2  && (E =  P), (C  & 4) = == 4 ?  (B = de (L)) :  (C & 8)  === 8  && (B =  P), (A  = z.fr om(u.me mory.bu ffer, A , I).to String( )), y.u timesSy nc(v.re solve(m .path,  A), new  Date(E ), new  Date(B) ), 0)
                       }) ,
                       path_l ink: x( functio n (m, E , A, I,  k, L,  C) {
                            return  (m = n (m, Fr) ), (k =  n(k, U r)), !m .path | | !k.pa th ? 28  : (u.r efreshM emory() , (A =  z.from( u.memor y.buffe r, A, I ).toStr ing()),  (L = z .from(u .memory .buffer , L, C) .toStri ng()),  y.linkS ync(v.r esolve( m.path,  A), v. resolve (k.path , L)),  0)
                       }),
                       pa th_open : x(fun ction ( m, E, A , I, k,  L, C,  B, P) { 
                           ;(E  = n(m,  or)),  (L = T( L)), (C  = T(C) ), (m =  (L & ( Mt | sr )) !==  T(0))
                            var D  = (L &  (Zt |  jt | ir  | ur))  !== T( 0)
                           i f (D &&  m) var  M = y. constan ts.O_RD WR
                           e lse m ?  (M = y .consta nts.O_R DONLY)  : D &&  (M = y. constan ts.O_WR ONLY)
                            if (( (m = L  | or),  (L |= C ), k &  1 && (( M |= y. constan ts.O_CR EAT), ( m |= Br )), k &  2 && ( M |= y. constan ts.O_DI RECTORY ), k &  4 && (M  |= y.c onstant s.O_EXC L), k &  8 && ( (M |= y .consta nts.O_T RUNC),  (m |= Y r)), B  & 1 &&  (M |= y .consta nts.O_A PPEND),  B & 2  && ((M  = y.con stants. O_DSYNC  ? M |  y.const ants.O_ DSYNC :  M | y. constan ts.O_SY NC), (L  |= Zt) ), B &  4 && (M  |= y.c onstant s.O_NON BLOCK),  B & 8  && ((M  = y.con stants. O_RSYNC  ? M |  y.const ants.O_ RSYNC :  M | y. constan ts.O_SY NC), (L  |= xt) ), B &  16 && ( (M |= y .consta nts.O_S YNC), ( L |= xt )), D & & !(M &  (y.con stants. O_APPEN D | y.c onstant s.O_TRU NC)) &&  (L |=  pe), u. refresh Memory( ), (A =  z.from (u.memo ry.buff er, A,  I).toSt ring()) , (A =  v.resol ve(E.pa th, A)) , v.rel ative(E .path,  A).star tsWith( "..")))  return  76
                            try {
                                v ar W =  y.realp athSync (A)
                                if  (v.rela tive(E. path, W ).start sWith(" ..")) r eturn 7 6
                           }  catch ( J) {
                                if  (J.cod e === " ENOENT" ) W = A 
                                else t hrow J
                            }
                            try {
                                 var X =  y.stat Sync(W) .isDire ctory() 
                           } c atch {} 
                           ret urn (M  = !D &&  X ? y. openSyn c(W, y. constan ts.O_RD ONLY) :  y.open Sync(W,  M)), ( X = Ke( u.FD_MA P.keys( )).reve rse()[0 ] + 1),  u.FD_M AP.set( X, { re al: M,  filetyp e: void  0, rig hts: {  base: m , inher iting:  L }, pa th: W } ), si(u , X), u .view.s etUint3 2(P, X,  !0), 0 
                       }),
                       path _readli nk: x(f unction  (m, E,  A, I,  k, L) { 
                           ret urn (m  = n(m,  Dr)), m .path ?  (u.ref reshMem ory(),  (E = z. from(u. memory. buffer,  E, A). toStrin g()), ( E = v.r esolve( m.path,  E)), ( E = y.r eadlink Sync(E) ), (I =  z.from (u.memo ry.buff er).wri te(E, I , k)),  u.view. setUint 32(L, I , !0),  0) : 28 
                       }),
                       path _remove _direct ory: x( functio n (m, E , A) {
                            retu rn (m =  n(m, G r)), m. path ?  (u.refr eshMemo ry(), ( E = z.f rom(u.m emory.b uffer,  E, A).t oString ()), y. rmdirSy nc(v.re solve(m .path,  E)), 0)  : 28
                       }) ,
                       path_r ename:  x(funct ion (m,  E, A,  I, k, L ) {
                            return  (m = n( m, Mr)) , (I =  n(I, xr )), !m. path ||  !I.pat h ? 28  : (u.re freshMe mory(),  (E = z .from(u .memory .buffer , E, A) .toStri ng()),  (k = z. from(u. memory. buffer,  k, L). toStrin g()), y .rename Sync(v. resolve (m.path , E), v .resolv e(I.pat h, k)),  0)
                       }),
                       p ath_sym link: x (functi on (m,  E, A, I , k) {
                            retu rn (A =  n(A, W r)), A. path ?  (u.refr eshMemo ry(), ( m = z.f rom(u.m emory.b uffer,  m, E).t oString ()), (I  = z.fr om(u.me mory.bu ffer, I , k).to String( )), y.s ymlinkS ync(m,  v.resol ve(A.pa th, I)) , 0) :  28
                       }),
                       pa th_unli nk_file : x(fun ction ( m, E, A ) {
                            return  (m = n( m, zr)) , m.pat h ? (u. refresh Memory( ), (E =  z.from (u.memo ry.buff er, E,  A).toSt ring()) , y.unl inkSync (v.reso lve(m.p ath, E) ), 0) :  28
                       }),
                       p oll_one off: fu nction  (m, E,  A, I) { 
                           var  k = 0, 
                                L = 0
                            u.re freshMe mory()
                            for  (var C  = 0; C  < A; C  += 1) { 
                                var B  = u.vie w.getBi gUint64 (m, !0) 
                                m += 8 
                                var P  = u.vie w.getUi nt8(m)
                                 switch  (((m +=  1), P) ) {
                                     case 0 :
                                         ;(m  += 7),  u.view. getBigU int64(m , !0),  (m += 8 )
                                         var  D = u.v iew.get Uint32( m, !0)
                                          ;(m +=  4), (m  += 4),  (P = u .view.g etBigUi nt64(m,  !0)),  (m += 8 ), u.vi ew.getB igUint6 4(m, !0 ), (m + = 8)
                                         v ar M =  u.view. getUint 16(m, ! 0)
                                         ;(m  += 2),  (m +=  6)
                                         var  W = M  === 1
                                          ;(M = 0 ), (D =  T(r(D) )), D = == null  ? (M =  28) :  ((P = W  ? P :  D + P),  (L = P  > L ?  P : L)) , u.vie w.setBi gUint64 (E, B,  !0), (E  += 8),  u.view .setUin t16(E,  M, !0),  (E +=  2), u.v iew.set Uint8(E , 0), ( E += 1) , (E +=  5), (k  += 1)
                                          break
                                     cas e 1:
                                     case  2:
                                         ;(m  += 3),  u.view .getUin t32(m,  !0), (m  += 4),  u.view .setBig Uint64( E, B, ! 0), (E  += 8),  u.view. setUint 16(E, 5 2, !0),  (E +=  2), u.v iew.set Uint8(E , P), ( E += 1) , (E +=  5), (k  += 1)
                                          break
                                     def ault:
                                          return  28
                                }
                            }
                           f or (u.v iew.set Uint32( I, k, ! 0); a.h rtime()  < L; ) ;
                           re turn 0
                       } ,
                       proc_e xit: fu nction  (m) {
                            retur n a.exi t(m), 0 
                       },
                       proc_ raise:  functio n (m) { 
                           ret urn m i n ii ?  (a.kill (ii[m]) , 0) :  28
                       },
                       ran dom_get : funct ion (m,  E) {
                            retur n u.ref reshMem ory(),  a.rando mFillSy nc(new  Uint8Ar ray(u.m emory.b uffer),  m, E),  0
                       },
                       sch ed_yiel d: func tion ()  {
                           r eturn 0 
                       },
                       sock_ recv: f unction  () {
                            retur n 52
                       },
                       s ock_sen d: func tion ()  {
                           r eturn 5 2
                       },
                       sock _shutdo wn: fun ction ( ) {
                            return  52
                       },
                   }),
                       e.tr aceSysc alls && 
                           Obj ect.key s(this. wasiImp ort).fo rEach(f unction  (m) {
                                 var E =  u.wasi Import[ m]
                                u.wa siImpor t[m] =  functio n () {
                                     for  (var A  = [],  I = 0;  I < arg uments. length;  I++) A [I] = a rgument s[I]
                                     conso le.log( "WASI:  wasiImp ort cal led: "  + m + "  (" + A  + ")") 
                                    tr y {
                                         va r k = E .apply( void 0,  Ke(A)) 
                                         retur n conso le.log( "WASI:   => " +  k), k
                                     } c atch (L ) {
                                         th row (co nsole.l og("Cat ched er ror: "  + L), L )
                                    } 
                                }
                           } )
              }
              return  (
                  (t. prototy pe.refr eshMemo ry = fu nction  () {
                       ;(t his.vie w && th is.view .buffer .byteLe ngth != = 0) ||  (this. view =  new He( this.me mory.bu ffer))
                   }),
                   (t.pro totype. setMemo ry = fu nction  (e) {
                       th is.memo ry = e
                   }),
                   (t.pro totype. start =  functi on (e)  {
                       if ((( e = e.e xports) , e ===  null | | typeo f e !=  "object ")) thr ow Erro r("inst ance.ex ports m ust be  an Obje ct. Rec eived "  + e +  ".")
                       var  r = e. memory
                       i f (!(r  instanc eof Web Assembl y.Memor y)) thr ow Erro r("inst ance.ex ports.m emory m ust be  a WebAs sembly. Memory.  Reccei ved " +  r + ". ")
                       this. setMemo ry(r),  e._star t && e. _start( )
                  }), 
                  (t.p rototyp e.getIm portNam espace  = funct ion (e)  {
                       var r ,
                           n  = null
                       t ry {
                            for (v ar i =  Ve(WebA ssembly .Module .import s(e)),  s = i.n ext();  !s.done ; s = i .next() ) {
                                var  u = s. value
                                i f (u.ki nd ===  "functi on" &&  u.modul e.start sWith(" wasi_") ) {
                                     if (!n ) n = u .module 
                                    el se if ( n !== u .module ) throw  Error( "Multip le name spaces  detecte d.")
                                }
                            }
                       } c atch (g ) {
                            var l =  { erro r: g }
                       }  finall y {
                            try {
                                s  && !s. done &&  (r = i .return ) && r. call(i) 
                           } f inally  {
                                if (l ) throw  l.erro r
                           }
                       } 
                       return  n
                  }), 
                  (t.p rototyp e.getIm ports =  functi on (e)  {
                       switch  (this. getImpo rtNames pace(e) ) {
                            case "w asi_uns table": 
                                return  { wasi _unstab le: thi s.wasiI mport } 
                           cas e "wasi _snapsh ot_prev iew1":
                                 return  { wasi_ snapsho t_previ ew1: th is.wasi Import  }
                           de fault:
                                 throw E rror("C an't de tect a  WASI na mespace  for th e WebAs sembly  Module" )
                       }
                  }) ,
                  (t. default Binding s = bn) ,
                  t
              )
          })()
     funct ion _s( t) {
         r eturn t  && t._ _esModu le && O bject.p rototyp e.hasOw nProper ty.call (t, "de fault")  ? t.de fault :  t
     }
    f unction  Et(t)  {
         if ( typeof  t != "s tring")  throw  new Typ eError( "Path m ust be  a strin g. Rece ived "  + JSON. stringi fy(t))
     }
     func tion li (t, e)  {
         for  (var r  = "", n  = 0, i  = -1,  s = 0,  u, l =  0; l <=  t.leng th; ++l ) {
              if (l  < t.le ngth) u  = t.ch arCodeA t(l)
              else  {
                  if  (u ===  47) br eak
                  u  = 47
              }
              if  (u ===  47) {
                   if (!( i === l  - 1 ||  s ===  1))
                       if ( i !== l  - 1 &&  s ===  2) {
                            if (r. length  < 2 ||  n !== 2  || r.c harCode At(r.le ngth -  1) !==  46 || r .charCo deAt(r. length  - 2) != = 46) { 
                                if (r. length  > 2) {
                                     var  g = r. lastInd exOf("/ ")
                                     if (g ! == r.le ngth -  1) {
                                         g  === -1  ? ((r  = ""),  (n = 0) ) : ((r  = r.sl ice(0,  g)), (n  = r.le ngth -  1 - r.l astInde xOf("/" ))), (i  = l),  (s = 0) 
                                         conti nue
                                     }
                                } el se if ( r.lengt h === 2  || r.l ength = == 1) { 
                                    ;( r = "") , (n =  0), (i  = l), ( s = 0)
                                     con tinue
                                } 
                           }
                            e &&  (r.leng th > 0  ? (r +=  "/..")  : (r =  ".."),  (n = 2 ))
                       } els e r.len gth > 0  ? (r + = "/" +  t.slic e(i + 1 , l)) :  (r = t .slice( i + 1,  l)), (n  = l -  i - 1)
                   ;(i =  l), (s  = 0)
              } e lse u = == 46 & & s !==  -1 ? + +s : (s  = -1)
          }
         ret urn r
     }
     funct ion Ss( t, e) { 
         var r  = e.di r || e. root,
              n =  e.base  || (e. name ||  "") +  (e.ext  || "")
          return  r ? (r  === e. root ?  r + n :  r + t  + n) :  n
    } 
    va r me =  {
         reso lve: fu nction  () {
              for  (var e  = "", r  = !1,  n, i =  argumen ts.leng th - 1;  i >= - 1 && !r ; i--)  {
                  var  s
                  i  >= 0 ?  (s = ar guments [i]) :  (n ===  void 0  && (n =  proces s.cwd() ), (s =  n)), E t(s), s .length  !== 0  && ((e  = s + " /" + e) , (r =  s.charC odeAt(0 ) === 4 7))
              }
              retur n (e =  li(e, ! r)), r  ? (e.le ngth >  0 ? "/"  + e :  "/") :  e.lengt h > 0 ?  e : ". "
         },
          normali ze: fun ction ( e) {
              if ( (Et(e),  e.leng th ===  0)) ret urn "." 
             v ar r =  e.charC odeAt(0 ) === 4 7,
                  n  = e.cha rCodeAt (e.leng th - 1)  === 47 
             r eturn ( e = li( e, !r)) , e.len gth ===  0 && ! r && (e  = ".") , e.len gth > 0  && n & & (e +=  "/"),  r ? "/"  + e :  e
         },
          isAbsol ute: fu nction  (e) {
              ret urn Et( e), e.l ength >  0 && e .charCo deAt(0)  === 47 
         },
         j oin: fu nction  () {
              if ( argumen ts.leng th ===  0) retu rn "."
              fo r (var  e, r =  0; r <  argumen ts.leng th; ++r ) {
                  v ar n =  argumen ts[r]
                   Et(n),  n.leng th > 0  && (e = == void  0 ? (e  = n) :  (e +=  "/" + n ))
              }
              return  e ===  void 0  ? "." :  me.nor malize( e)
         },
          relati ve: fun ction ( e, r) { 
             i f ((Et( e), Et( r), e = == r ||  ((e =  me.reso lve(e)) , (r =  me.reso lve(r)) , e ===  r))) r eturn " "
              for (va r n = 1 ; n < e .length  && e.c harCode At(n) = == 47;  ++n);
              for  (var i  = e.le ngth, s  = i -  n, u =  1; u <  r.lengt h && r. charCod eAt(u)  === 47;  ++u);
              fo r (var  l = r.l ength,  g = l -  u, p =  s < g  ? s : g , a = - 1, y =  0; y <=  p; ++y ) {
                  i f (y == = p) {
                       i f (g >  p) {
                            if (r. charCod eAt(u +  y) ===  47) re turn r. slice(u  + y +  1)
                           i f (y == = 0) re turn r. slice(u  + y)
                       }  else s  > p &&  (e.char CodeAt( n + y)  === 47  ? (a =  y) : y  === 0 & & (a =  0))
                       brea k
                  }
                   var v  = e.cha rCodeAt (n + y) ,
                       w = r. charCod eAt(u +  y)
                  i f (v != = w) br eak
                  v  === 47  && (a  = y)
              }
              var  O = ""
              fo r (y =  n + a +  1; y < = i; ++ y) (y = == i ||  e.char CodeAt( y) ===  47) &&  (O.leng th ===  0 ? (O  += ".." ) : (O  += "/.. "))
              retur n O.len gth > 0  ? O +  r.slice (u + a)  : ((u  += a),  r.charC odeAt(u ) === 4 7 && ++ u, r.sl ice(u)) 
         },
         _ makeLon g: func tion (e ) {
              retur n e
         }, 
         dirna me: fun ction ( e) {
              if ( (Et(e),  e.leng th ===  0)) ret urn "." 
             f or (var  r = e. charCod eAt(0),  n = r  === 47,  i = -1 , s = ! 0, u =  e.lengt h - 1;  u >= 1;  --u)
                   if ((( r = e.c harCode At(u)),  r ===  47)) {
                       i f (!s)  {
                           i  = u
                            break
                       }
                   } els e s = ! 1
              return  i === - 1 ? (n  ? "/" :  ".") :  n && i  === 1  ? "//"  : e.sli ce(0, i )
         },
          basenam e: func tion (e , r) {
              if  (r !==  void 0  && typ eof r ! = "stri ng") th row new  TypeEr ror('"e xt" arg ument m ust be  a strin g')
              Et(e) 
             v ar n =  0,
                  i  = -1,
                   s = !0 ,
                  u
              if  (r !==  void 0  && r.le ngth >  0 && r. length  <= e.le ngth) { 
                  if ( r.lengt h === e .length  && r = == e) r eturn " "
                  var  l = r. length  - 1,
                       g =  -1
                  f or (u =  e.leng th - 1;  u >= 0 ; --u)  {
                       var p  = e.cha rCodeAt (u)
                       if ( p === 4 7) {
                            if (!s ) {
                                n =  u + 1
                                 break
                            }
                       } el se g == = -1 &&  ((s =  !1), (g  = u +  1)), l  >= 0 &&  (p ===  r.char CodeAt( l) ? -- l === - 1 && (i  = u) :  ((l =  -1), (i  = g))) 
                  }
                   return  n === i  ? (i =  g) : i  === -1  && (i  = e.len gth), e .slice( n, i)
              } e lse {
                   for (u  = e.le ngth -  1; u >=  0; --u )
                       if (e. charCod eAt(u)  === 47)  {
                           i f (!s)  {
                                n = u  + 1
                                br eak
                            }
                       } else  i ===  -1 && ( (s = !1 ), (i =  u + 1) )
                  ret urn i = == -1 ?  "" : e .slice( n, i)
              }
          },
         ext name: f unction  (e) {
              Et (e)
              for ( var r =  -1, n  = 0, i  = -1, s  = !0,  u = 0,  l = e.l ength -  1; l > = 0; -- l) {
                   var g =  e.char CodeAt( l)
                  if  (g ===  47) {
                       i f (!s)  {
                           n  = l + 1 
                           bre ak
                       }
                       cont inue
                   }
                  i = == -1 & & ((s =  !1), ( i = l +  1)), g  === 46  ? (r = == -1 ?  (r = l ) : u ! == 1 &&  (u = 1 )) : r  !== -1  && (u =  -1)
              }
              retu rn r == = -1 ||  i ===  -1 || u  === 0  || (u = == 1 &&  r ===  i - 1 & & r ===  n + 1)  ? "" :  e.slic e(r, i) 
         },
         f ormat:  functio n (e) { 
             i f (e == = null  || type of e !=  "objec t") thr ow new  TypeErr or('The  "pathO bject"  argumen t must  be of t ype Obj ect. Re ceived  type '  + typeo f e)
              retu rn Ss(" /", e)
          },
         pa rse: fu nction  (e) {
              Et( e)
              var r  = { roo t: "",  dir: "" , base:  "", ex t: "",  name: " " }
              if (e .length  === 0)  return  r
              var n  = e.cha rCodeAt (0),
                   i = n = == 47,
                   s
              i ? ( (r.root  = "/") , (s =  1)) : ( s = 0)
              fo r (var  u = -1,  l = 0,  g = -1 , p = ! 0, a =  e.lengt h - 1,  y = 0;  a >= s;  --a) { 
                  if ( ((n = e .charCo deAt(a) ), n == = 47))  {
                       if (!p ) {
                            l = a +  1
                           b reak
                       }
                       co ntinue
                   }
                  g  === -1  && ((p  = !1),  (g = a  + 1)),  n ===  46 ? (u  === -1  ? (u =  a) : y  !== 1  && (y =  1)) :  u !== - 1 && (y  = -1)
              }
              re turn u  === -1  || g == = -1 ||  y ===  0 || (y  === 1  && u == = g - 1  && u = == l +  1) ? g  !== -1  && (l = == 0 &&  i ? (r .base =  r.name  = e.sl ice(1,  g)) : ( r.base  = r.nam e = e.s lice(l,  g))) :  (l ===  0 && i  ? ((r. name =  e.slice (1, u)) , (r.ba se = e. slice(1 , g)))  : ((r.n ame = e .slice( l, u)),  (r.bas e = e.s lice(l,  g))),  (r.ext  = e.sli ce(u, g ))), l  > 0 ? ( r.dir =  e.slic e(0, l  - 1)) :  i && ( r.dir =  "/"),  r
         },
          sep: "/ ",
         del imiter:  ":",
          win32:  null,
          posix:  null,
     }
     me.po six = m e
    v ar Rs =  me,
         A s = _s( Rs)
     class  Os {
         c onstruc tor(e,  r, n) { 
             ; (this.w asmFs =  e), (t his.cwd  = "/") , n ==  null &&  (n = " /"), (t his.was i = new  hi({ a rgs: r,  bindin gs: { . ..hi.de faultBi ndings,  fs: th is.wasm Fs.fs,  path: A s }, pr eopens:  { "/":  "/", " .": n }  })), ( this.im ports =  { wasi _snapsh ot_prev iew1: t his.was i.wasiI mport } ), this .chdir( n)
         }
          async r unWasiE ntry(e)  {
              const  r = awa it this .loadWa sm(e)
              thi s.wasi. start(r )
         }
         a sync lo adWasm( e) {
              let  r
              if (typ eof e = = "stri ng") {
                   const  i = th is.wasm Fs.fs.r eadFile Sync(th is.getA bsPath( e))
                  i f (i ==  null)  throw " File no t found "
                  r =  await  WebAsse mbly.in stantia te(i, t his.imp orts)
              } e lse ret urn con sole.er ror(\`Pa th or b uffer r equired : \${e}\` ), null 
             c onst n  = r.ins tance
              ret urn n.e xports. memory  && ((th is.memo ry = n. exports .memory ), this .wasi.s etMemor y(this. memory) ), n
         } 
         chdir (e) {
              con st r =  this.wa smFs.fs .statSy nc(e)
              ret urn r ! = null  && r.is Directo ry() ?  ((this. cwd = e ), !0)  : !1
         } 
         getAb sPath(e ) {
              retur n e.len gth > 0  && e[0 ] === " /" ? e  : \`\${th is.cwd} \${this. cwd ===  "/" ?  "" : "/ "}\${e}\` 
         }
     }
     functio n Ts(t,  e, r,  n) {
         r eturn n ew (r | | (r =  Promise ))(func tion (i , s) {
              fu nction  u(p) {
                   try { 
                       g(n.nex t(p))
                   } catc h (a) { 
                       s(a)
                   }
              }
              functio n l(p)  {
                  try  {
                       g(n.t hrow(p) )
                  } c atch (a ) {
                       s(a) 
                  }
              }
              func tion g( p) {
                   p.done
                       ?  i(p.va lue)
                       : n ew r(fu nction  (a) {
                              a(p .value) 
                         }).th en(u, l )
              }
              g((n =  n.apply (t, []) ).next( ))
         })
     }
     func tion Is (t, e)  {
         func tion r( p) {
              retu rn func tion (a ) {
                  r eturn n ([p, a] )
              }
         }
         f unction  n(p) { 
             i f (s) t hrow ne w TypeE rror("G enerato r is al ready e xecutin g.")
              for  (; i; ) 
                  try  {
                       if ((( s = 1),  u && ( l = p[0 ] & 2 ?  u.retu rn : p[ 0] ? u. throw | | ((l =  u.retu rn) &&  l.call( u), 0)  : u.nex t) && ! (l = l. call(u,  p[1])) .done))  return  l
                       switc h (((u  = 0), l  && (p  = [p[0]  & 2, l .value] ), p[0] )) {
                            case 0 :
                           ca se 1:
                                l  = p
                                br eak
                            case 4: 
                                return  i.labe l++, {  value:  p[1], d one: !1  }
                           c ase 5:
                                 i.label ++, (u  = p[1]) , (p =  [0])
                                co ntinue
                            case  7:
                                ;(p  = i.op s.pop() ), i.tr ys.pop( )
                                conti nue
                            default :
                                if (( (l = i. trys),  !(l = 0  < l.le ngth &&  l[l.le ngth -  1]) &&  (p[0] = == 6 ||  p[0] = == 2)))  {
                                     i = 0
                                     cont inue
                                }
                                 if (p[0 ] === 3  && (!l  || (p[ 1] > l[ 0] && p [1] < l [3])))  i.label  = p[1] 
                                else i f (p[0]  === 6  && i.la bel < l [1]) (i .label  = l[1]) , (l =  p)
                                else  if (l  && i.la bel < l [2]) (i .label  = l[2]) , i.ops .push(p )
                                else  {
                                    l [2] &&  i.ops.p op(), i .trys.p op()
                                     conti nue
                                }
                       }
                       p  = e.ca ll(t, i )
                  } c atch (a ) {
                       ;(p  = [6, a ]), (u  = 0)
                   } final ly {
                       s =  l = 0
                   }
              if (p [0] & 5 ) throw  p[1]
              ret urn { v alue: p [0] ? p [1] : v oid 0,  done: ! 0 }
         }
          var i  = {
                  l abel: 0 ,
                  sen t: func tion ()  {
                       if (l [0] & 1 ) throw  l[1]
                       re turn l[ 1]
                  }, 
                  trys : [],
                   ops: [ ],
              },
              s,
              u,
              l,
              g
          return  (
              (g = {  next:  r(0), t hrow: r (1), re turn: r (2) }), 
             t ypeof S ymbol = = "func tion" & &
                  (g[ Symbol. iterato r] = fu nction  () {
                       ret urn thi s
                  }), 
             g 
         )
     }
     functio n Kr(t)  {
         var  e = ty peof Sy mbol ==  "funct ion" &&  t[Symb ol.iter ator],
              r  = 0
         re turn e
              ?  e.call( t)
              : {
                     next:  functi on () { 
                         retur n t &&  r >= t. length  && (t =  void 0 ), { va lue: t  && t[r+ +], don e: !t } 
                    }, 
                }
     }
    f unction  Ns(t,  e) {
         v ar r =  typeof  Symbol  == "fun ction"  && t[Sy mbol.it erator] 
         if (! r) retu rn t
         t  = r.ca ll(t)
          var n,
              i  = []
         t ry {
              for  (; (e = == void  0 || 0  < e--)  && !(n  = t.ne xt()).d one; )  i.push( n.value )
         } ca tch (u)  {
              var s  = { err or: u } 
         } fin ally {
              tr y {
                  n  && !n. done &&  (r = t .return ) && r. call(t) 
             }  finall y {
                  i f (s) t hrow s. error
              }
          }
         retu rn i
     }
     functi on ks()  {
         for  (var t  = [],  e = 0;  e < arg uments. length;  e++) t  = t.co ncat(Ns (argume nts[e]) )
         retu rn t
     }
     var H  = typeo f globa lThis <  "u" ?  globalT his : t ypeof w indow <  "u" ?  window  : typeo f globa l < "u"  ? glob al : ty peof se lf < "u " ? sel f : {}
     fun ction e t(t) {
          return  t && t .__esMo dule &&  Object .protot ype.has OwnProp erty.ca ll(t, " default ") ? t. default  : t
     }
     functi on b(t,  e) {
          return  (e = {  exports : {} }) , t(e,  e.expor ts), e. exports 
    }
     var  F = b( functio n (t, e ) {
         Ob ject.de finePro perty(e , "__es Module" , { val ue: !0  }), (e. constan ts = {  O_RDONL Y: 0, O _WRONLY : 1, O_ RDWR: 2 , S_IFM T: 6144 0, S_IF REG: 32 768, S_ IFDIR:  16384,  S_IFCHR : 8192,  S_IFBL K: 2457 6, S_IF IFO: 40 96, S_I FLNK: 4 0960, S _IFSOCK : 49152 , O_CRE AT: 64,  O_EXCL : 128,  O_NOCTT Y: 256,  O_TRUN C: 512,  O_APPE ND: 102 4, O_DI RECTORY : 65536 , O_NOA TIME: 2 62144,  O_NOFOL LOW: 13 1072, O _SYNC:  1052672 , O_DIR ECT: 16 384, O_ NONBLOC K: 2048 , S_IRW XU: 448 , S_IRU SR: 256 , S_IWU SR: 128 , S_IXU SR: 64,  S_IRWX G: 56,  S_IRGRP : 32, S _IWGRP:  16, S_ IXGRP:  8, S_IR WXO: 7,  S_IROT H: 4, S _IWOTH:  2, S_I XOTH: 1 , F_OK:  0, R_O K: 4, W _OK: 2,  X_OK:  1, UV_F S_SYMLI NK_DIR:  1, UV_ FS_SYML INK_JUN CTION:  2, UV_F S_COPYF ILE_EXC L: 1, U V_FS_CO PYFILE_ FICLONE : 2, UV _FS_COP YFILE_F ICLONE_ FORCE:  4, COPY FILE_EX CL: 1,  COPYFIL E_FICLO NE: 2,  COPYFIL E_FICLO NE_FORC E: 4 }) 
    }) 
    et (F)
     var Ls  = b(fu nction  (t, e)  {
              e.defau lt =
                   typeof  BigInt  == "fun ction"
                       ?  BigInt 
                       : funct ion ()  {
                              throw E rror("B igInt i s not s upporte d in th is envi ronment .")
                         }
          }),
         v e = b(f unction  (t, e)  {
              Object .define Propert y(e, "_ _esModu le", {  value:  !0 })
              var  r = F. constan ts.S_IF MT,
                  n  = F.co nstants .S_IFDI R,
                  i  = F.con stants. S_IFREG ,
                  s =  F.cons tants.S _IFBLK, 
                  u =  F.const ants.S_ IFCHR,
                   l = F .consta nts.S_I FLNK,
                   g = F. constan ts.S_IF IFO,
                   p = F.c onstant s.S_IFS OCK
              ;(t =  (funct ion ()  {
                  fun ction a () {}
                   return  (
                       (a.bu ild = f unction  (y, v)  {
                           v  === vo id 0 &&  (v = ! 1)
                           v ar w =  new a() ,
                                O = y .gid,
                                \$  = y.at ime,
                                Tt  = y.mt ime,
                                Bt  = y.ct ime
                            return  (
                                (v =  v
                                    ?  Ls.def ault
                                     : fun ction ( ue) {
                                            retur n ue
                                       }), 
                                (w.uid  = v(y. uid)),
                                 (w.gid  = v(O)) ,
                                (w.rd ev = v( 0)),
                                (w .blksiz e = v(4 096)),
                                 (w.ino  = v(y.i no)),
                                ( w.size  = v(y.g etSize( ))),
                                (w .blocks  = v(1) ),
                                (w.a time =  \$),
                                (w. mtime =  Tt),
                                ( w.ctime  = Bt), 
                                (w.bir thtime  = Bt),
                                 (w.atim eMs = v (\$.getT ime())) ,
                                (w.mt imeMs =  v(Tt.g etTime( ))),
                                (O  = v(Bt .getTim e())),
                                 (w.ctim eMs = O ),
                                (w.b irthtim eMs = O ),
                                (w.d ev = v( 0)),
                                (w .mode =  v(y.mo de)),
                                ( w.nlink  = v(y. nlink)) ,
                                w
                            )
                       }),
                       (a. prototy pe._che ckModeP roperty  = func tion (y ) {
                            return  (Number (this.m ode) &  r) ===  y
                       }),
                       (a. prototy pe.isDi rectory  = func tion ()  {
                           r eturn t his._ch eckMode Propert y(n)
                       }), 
                       (a.prot otype.i sFile =  functi on () { 
                           ret urn thi s._chec kModePr operty( i)
                       }),
                       (a .protot ype.isB lockDev ice = f unction  () {
                            retur n this. _checkM odeProp erty(s) 
                       }),
                       (a.p rototyp e.isCha racterD evice =  functi on () { 
                           ret urn thi s._chec kModePr operty( u)
                       }),
                       (a .protot ype.isS ymbolic Link =  functio n () {
                            retu rn this ._check ModePro perty(l )
                       }),
                       (a. prototy pe.isFI FO = fu nction  () {
                            return  this._ checkMo dePrope rty(g)
                       } ),
                       (a.pr ototype .isSock et = fu nction  () {
                            return  this._ checkMo dePrope rty(p)
                       } ),
                       a
                  ) 
             } )()),
                   (e.Sta ts = t) ,
                  (e. default  = t)
          })
     et(ve)
     var  te = t ypeof g lobal <  "u" ?  global  : typeo f self  < "u" ?  self :  typeof  window  < "u"  ? windo w : {}, 
         _t =  [],
         ct  = [],
          Ps = t ypeof U int8Arr ay < "u " ? Uin t8Array  : Arra y,
         Hr  = !1
     funct ion ci( ) {
         Hr  = !0
          for (va r t = 0 ; 64 >  t; ++t)  (_t[t]  = "ABC DEFGHIJ KLMNOPQ RSTUVWX YZabcde fghijkl mnopqrs tuvwxyz 0123456 789+/"[ t]), (c t["ABCD EFGHIJK LMNOPQR STUVWXY Zabcdef ghijklm nopqrst uvwxyz0 1234567 89+/".c harCode At(t)]  = t)
         ; (ct[45]  = 62),  (ct[95 ] = 63) 
    }
     fun ction C s(t, e,  r) {
          for (va r n = [ ], i =  e; i <  r; i +=  3) (e  = (t[i]  << 16)  + (t[i  + 1] < < 8) +  t[i + 2 ]), n.p ush(_t[ (e >> 1 8) & 63 ] + _t[ (e >> 1 2) & 63 ] + _t[ (e >> 6 ) & 63]  + _t[e  & 63]) 
         retur n n.joi n("")
     }
     funct ion pi( t) {
         H r || ci ()
         for  (var e  = t.le ngth, r  = e %  3, n =  "", i =  [], s  = 0, u  = e - r ; s < u ; s +=  16383)  i.push( Cs(t, s , s + 1 6383 >  u ? u :  s + 16 383))
          return  r === 1  ? ((t  = t[e -  1]), ( n += _t [t >> 2 ]), (n  += _t[( t << 4)  & 63]) , (n +=  "=="))  : r == = 2 &&  ((t = ( t[e - 2 ] << 8)  + t[e  - 1]),  (n += _ t[t >>  10]), ( n += _t [(t >>  4) & 63 ]), (n  += _t[( t << 2)  & 63]) , (n +=  "=")),  i.push (n), i. join("" )
    } 
    fu nction  hr(t, e , r, n,  i) {
          var s =  8 * i  - n - 1 ,
              u = (1  << s) -  1,
              l = u  >> 1,
              g  = -7
         i  = r ?  i - 1 :  0
         var  p = r  ? -1 :  1,
              a = t[ e + i]
          for (i  += p,  r = a &  ((1 <<  -g) -  1), a > >= -g,  g += s;  0 < g;  r = 25 6 * r +  t[e +  i], i + = p, g  -= 8);
          for (s  = r &  ((1 <<  -g) - 1 ), r >> = -g, g  += n;  0 < g;  s = 256  * s +  t[e + i ], i +=  p, g - = 8);
          if (r = == 0) r  = 1 -  l
         else  {
              if (r  === u)  return  s ? NaN  : (1 /  0) * ( a ? -1  : 1)
              ;(s  += Math .pow(2,  n)), ( r -= l) 
         }
         re turn (a  ? -1 :  1) * s  * Math .pow(2,  r - n) 
    }
     fun ction l r(t, e,  r, n,  i, s) { 
         var u ,
              l = 8 *  s - i  - 1,
              g =  (1 << l ) - 1,
              p  = g >>  1,
              a = i  === 23  ? Math. pow(2,  -24) -  Math.po w(2, -7 7) : 0
          s = n  ? 0 : s  - 1
         v ar y =  n ? 1 :  -1,
              v =  0 > e | | (e == = 0 &&  0 > 1 /  e) ? 1  : 0
         f or (e =  Math.a bs(e),  isNaN(e ) || e  === 1 /  0 ? (( e = isN aN(e) ?  1 : 0) , (n =  g)) : ( (n = Ma th.floo r(Math. log(e)  / Math. LN2)),  1 > e *  (u = M ath.pow (2, -n) ) && (n --, (u  *= 2)),  (e = 1  <= n +  p ? e  + a / u  : e +  a * Mat h.pow(2 , 1 - p )), 2 < = e * u  && (n+ +, (u / = 2)),  n + p > = g ? ( (e = 0) , (n =  g)) : 1  <= n +  p ? (( e = (e  * u - 1 ) * Mat h.pow(2 , i)),  (n += p )) : (( e = e *  Math.p ow(2, p  - 1) *  Math.p ow(2, i )), (n  = 0)));  8 <= i ; t[r +  s] = e  & 255,  s += y , e /=  256, i  -= 8);
          for (n  = (n < < i) |  e, l +=  i; 0 <  l; t[r  + s] =  n & 25 5, s +=  y, n / = 256,  l -= 8) ;
         t[r  + s - y ] |= 12 8 * v
     }
     var B s = {}. toStrin g,
         ai  =
              Array.i sArray  ||
              functi on (t)  {
                  ret urn Bs. call(t)  == "[o bject A rray]"
              }
     S.T YPED_AR RAY_SUP PORT =  te.TYPE D_ARRAY _SUPPOR T !== v oid 0 ?  te.TYP ED_ARRA Y_SUPPO RT : !0 
    va r Fs =  S.TYPED _ARRAY_ SUPPORT  ? 2147 483647  : 10737 41823
     // f unction  kt(t,  e) {
     //      if (( S.TYPED _ARRAY_ SUPPORT  ? 2147 483647  : 10737 41823)  < e) th row new  RangeE rror("I nvalid  typed a rray le ngth")
     //      ret urn S.T YPED_AR RAY_SUP PORT ?  ((t = n ew Uint 8Array( e)), (t .__prot o__ = S .protot ype)) :  (t ===  null & & (t =  new S(e )), (t. length  = e)),  t
    / / }
     functi on kt(a rray, l ength)  {
         cons t maxLe ngth =  R.TYPED _ARRAY_ SUPPORT  ? 2147 483647  : 10737 41823;
          
         if ( length  > maxLe ngth) { 
             t hrow ne w Range Error(" Invalid  typed  array l ength") ;
         }
         
          if (R. TYPED_A RRAY_SU PPORT)  {
              array =  new Ui nt8Arra y(lengt h);
              Objec t.setPr ototype Of(arra y, R.pr ototype );
         } e lse {
              if  (array  === nul l) {
                   array =  new R( length) ;
              }
              array.l ength =  length ;
         }
         
          return  array; 
    }
     fun ction S (t, e,  r) {
         i f (!(S. TYPED_A RRAY_SU PPORT | | this  instanc eof S))  return  new S( t, e, r )
         if ( typeof  t == "n umber")  {
              if (ty peof e  == "str ing") t hrow Er ror("If  encodi ng is s pecifie d then  the fir st argu ment mu st be a  string ")
              return  Xr(thi s, t)
          }
         retu rn yi(t his, t,  e, r)
     }
     ;(S. poolSiz e = 819 2),
         (S ._augme nt = fu nction  (t) {
              ret urn (t. __proto __ = S. prototy pe), t
          })
     functi on yi(t , e, r,  n) {
          if (typ eof e = = "numb er") th row new  TypeEr ror('"v alue" a rgument  must n ot be a  number ')
         if  (typeof  ArrayB uffer <  "u" &&  e inst anceof  ArrayBu ffer) { 
             i f ((e.b yteLeng th, 0 >  r || e .byteLe ngth <  r)) thr ow new  RangeEr ror("'o ffset'  is out  of boun ds")
              if ( e.byteL ength <  r + (n  || 0))  throw  new Ran geError ("'leng th' is  out of  bounds" )
              return  (e = r  === voi d 0 &&  n === v oid 0 ?  new Ui nt8Arra y(e) :  n === v oid 0 ?  new Ui nt8Arra y(e, r)  : new  Uint8Ar ray(e,  r, n)),  S.TYPE D_ARRAY _SUPPOR T ? ((t  = e),  (t.__pr oto__ =  S.prot otype))  : (t =  Jr(t,  e)), t
          }
         if  (typeof  e == " string" ) {
              if (( (n = t) , (t =  r), (ty peof t  != "str ing" ||  t ===  "") &&  (t = "u tf8"),  !S.isEn coding( t))) th row new  TypeEr ror('"e ncoding " must  be a va lid str ing enc oding') 
             r eturn ( r = di( e, t) |  0), (n  = kt(n , r)),( console .log(n) ), (e =  n.writ e(e, t) ), e != = r &&  (n = n. slice(0 , e)),  n
         }
         r eturn U s(t, e) 
    }
     ;(S .from =  functi on (t,  e, r) { 
         retur n yi(nu ll, t,  e, r)
     }),
          S.TYPE D_ARRAY _SUPPOR T && (( S.proto type.__ proto__  = Uint 8Array. prototy pe), (S .__prot o__ = U int8Arr ay))
     funct ion gi( t) {
         i f (type of t !=  "numbe r") thr ow new  TypeErr or('"si ze" arg ument m ust be  a numbe r')
         if  (0 > t ) throw  new Ra ngeErro r('"siz e" argu ment mu st not  be nega tive')
     }
     S.al loc = f unction  (t, e,  r) {
          return  gi(t),  (t = 0  >= t ?  kt(null , t) :  e !== v oid 0 ?  (typeo f r ==  "string " ? kt( null, t ).fill( e, r) :  kt(nul l, t).f ill(e))  : kt(n ull, t) ), t
     }
     functi on Xr(t , e) {
          if ((g i(e), ( t = kt( t, 0 >  e ? 0 :  Zr(e)  | 0)),  !S.TYPE D_ARRAY _SUPPOR T)) for  (var r  = 0; r  < e; + +r) t[r ] = 0
          return  t
    } 
    ;( S.alloc Unsafe  = funct ion (t)  {
         ret urn Xr( null, t )
    } ),
         (S. allocUn safeSlo w = fun ction ( t) {
              retu rn Xr(n ull, t) 
         })
     funct ion Jr( t, e) { 
         var r  = 0 >  e.lengt h ? 0 :  Zr(e.l ength)  | 0
         t  = kt(t,  r)
         fo r (var  n = 0;  n < r;  n += 1)  t[n] =  e[n] &  255
         r eturn t 
    }
     fun ction U s(t, e)  {
         if  (St(e))  {
              var r  = Zr(e. length)  | 0
              retu rn (t =  kt(t,  r)), t. length  === 0 | | e.cop y(t, 0,  0, r),  t
         }
          if (e)  {
              if ((ty peof Ar rayBuff er < "u " && e. buffer  instanc eof Arr ayBuffe r) || " length"  in e)  return  (r = ty peof e. length  != "num ber") | | ((r =  e.leng th), (r  = r != = r)),  r ? kt( t, 0) :  Jr(t,  e)
              if (e. type == = "Buff er" &&  ai(e.da ta)) re turn Jr (t, e.d ata)
         } 
         throw  new Ty peError ("First  argume nt must  be a s tring,  Buffer,  ArrayB uffer,  Array,  or arra y-like  object. ")
     }
    f unction  Zr(t)  {
         if ( t >= (S .TYPED_ ARRAY_S UPPORT  ? 21474 83647 :  107374 1823))  throw n ew Rang eError( "Attemp t to al locate  Buffer  larger  than ma ximum s ize: 0x " + (S. TYPED_A RRAY_SU PPORT ?  214748 3647 :  1073741 823).to String( 16) + "  bytes" )
         retu rn t |  0
    } 
    S. isBuffe r = Lt
     fun ction S t(t) {
          return  !(t ==  null | | !t._i sBuffer )
    } 
    ;( S.compa re = fu nction  (t, e)  {
         if ( !St(t)  || !St( e)) thr ow new  TypeErr or("Arg uments  must be  Buffer s")
         if  (t ===  e) ret urn 0
          for (va r r = t .length , n = e .length , i = 0 , s = M ath.min (r, n);  i < s;  ++i)
              if  (t[i] ! == e[i] ) {
                  ; (r = t[ i]), (n  = e[i] )
                  bre ak
              }
         ret urn r <  n ? -1  : n <  r ? 1 :  0
     }),
         (S .isEnco ding =  functio n (t) { 
             s witch ( String( t).toLo werCase ()) {
                   case " hex":
                   case " utf8":
                   case  "utf-8" :
                  cas e "asci i":
                  c ase "la tin1":
                   case  "binary ":
                  ca se "bas e64":
                   case " ucs2":
                   case  "ucs-2" :
                  cas e "utf1 6le":
                   case " utf-16l e":
                       retu rn !0
                   defaul t:
                       retur n !1
              }
         } ),
         (S. concat  = funct ion (t,  e) {
              if  (!ai(t) ) throw  new Ty peError ('"list " argum ent mus t be an  Array  of Buff ers')
              if  (t.leng th ===  0) retu rn S.al loc(0)
              va r r
              if (e  === vo id 0) f or (r =  e = 0;  r < t. length;  ++r) e  += t[r ].lengt h
              e = S.a llocUns afe(e)
              va r n = 0 
             f or (r =  0; r <  t.leng th; ++r ) {
                  v ar i =  t[r]
                   if (!St (i)) th row new  TypeEr ror('"l ist" ar gument  must be  an Arr ay of B uffers' )
                  i.c opy(e,  n), (n  += i.le ngth)
              }
              ret urn e
          })
     functio n di(t,  e) {
          if (St( t)) ret urn t.l ength
          if (typ eof Arr ayBuffe r < "u"  && typ eof Arr ayBuffe r.isVie w == "f unction " && (A rrayBuf fer.isV iew(t)  || t in stanceo f Array Buffer) ) retur n t.byt eLength 
         typeo f t !=  "string " && (t  = "" +  t)
         va r r = t .length 
         if (r  === 0)  return  0
         for  (var n  = !1;  ; )
              switc h (e) { 
                  case  "ascii ":
                  ca se "lat in1":
                   case " binary" :
                       return  r
                  ca se "utf 8":
                  c ase "ut f-8":
                   case v oid 0:
                       r eturn y r(t).le ngth
                   case "u cs2":
                   case " ucs-2": 
                  case  "utf16 le":
                   case "u tf-16le ":
                       retur n 2 * r 
                  case  "hex": 
                       return  r >>> 1 
                  case  "base6 4":
                       retu rn Si(t ).lengt h
                  def ault:
                       if  (n) re turn yr (t).len gth
                       ;(e  = ("" +  e).toL owerCas e()), ( n = !0) 
             } 
    }
     S.b yteLeng th = di 
    fu nction  Ds(t, e , r) {
          var n  = !1
         i f (((e  === voi d 0 ||  0 > e)  && (e =  0), e  > this. length  || ((r  === voi d 0 ||  r > thi s.lengt h) && ( r = thi s.lengt h), 0 > = r) ||  ((r >> >= 0),  (e >>>=  0), r  <= e)))  return  ""
         fo r (t ||  (t = " utf8");  ; )
              swit ch (t)  {
                  cas e "hex" :
                       for (t  = e, e  = r, r  = this .length , (!t | | 0 > t ) && (t  = 0),  (!e ||  0 > e | | e > r ) && (e  = r),  n = "",  r = t;  r < e;  ++r) ( t = n),  (n = t his[r]) , (n =  16 > n  ? "0" +  n.toSt ring(16 ) : n.t oString (16)),  (n = t  + n)
                       ret urn n
                   case " utf8":
                   case  "utf-8" :
                       return  wi(thi s, e, r )
                  cas e "asci i":
                       for  (t = "" , r = M ath.min (this.l ength,  r); e <  r; ++e ) t +=  String. fromCha rCode(t his[e]  & 127)
                       r eturn t 
                  case  "latin 1":
                  c ase "bi nary":
                       f or (t =  "", r  = Math. min(thi s.lengt h, r);  e < r;  ++e) t  += Stri ng.from CharCod e(this[ e])
                       retu rn t
                   case "b ase64": 
                       return  (e = e  === 0 & & r ===  this.l ength ?  pi(thi s) : pi (this.s lice(e,  r))),  e
                  cas e "ucs2 ":
                  ca se "ucs -2":
                   case "u tf16le" :
                  cas e "utf- 16le":
                       f or (e =  this.s lice(e,  r), r  = "", t  = 0; t  < e.le ngth; t  += 2)  r += St ring.fr omCharC ode(e[t ] + 256  * e[t  + 1])
                       re turn r
                   defau lt:
                       if ( n) thro w new T ypeErro r("Unkn own enc oding:  " + t)
                       ; (t = (t  + ""). toLower Case()) , (n =  !0)
              }
     }
     S.proto type._i sBuffer  = !0
     func tion ee (t, e,  r) {
         v ar n =  t[e]
         ; (t[e] =  t[r]),  (t[r]  = n)
     }
     ;(S.pr ototype .swap16  = func tion ()  {
         var  t = th is.leng th
         if  (t % 2  !== 0)  throw n ew Rang eError( "Buffer  size m ust be  a multi ple of  16-bits ")
         for  (var e  = 0; e  < t; e  += 2)  ee(this , e, e  + 1)
         r eturn t his
     }),
         ( S.proto type.sw ap32 =  functio n () {
              va r t = t his.len gth
              if (t  % 4 != = 0) th row new  RangeE rror("B uffer s ize mus t be a  multipl e of 32 -bits") 
             f or (var  e = 0;  e < t;  e += 4 ) ee(th is, e,  e + 3),  ee(thi s, e +  1, e +  2)
              return  this
          }),
         (S .protot ype.swa p64 = f unction  () {
              var  t = th is.leng th
              if (t  % 8 !==  0) thr ow new  RangeEr ror("Bu ffer si ze must  be a m ultiple  of 64- bits")
              fo r (var  e = 0;  e < t;  e += 8)  ee(thi s, e, e  + 7),  ee(this , e + 1 , e + 6 ), ee(t his, e  + 2, e  + 5), e e(this,  e + 3,  e + 4) 
             r eturn t his
         }) ,
         (S.p rototyp e.toStr ing = f unction  () {
              var  t = th is.leng th | 0
              re turn t  === 0 ?  "" : a rgument s.lengt h === 0  ? wi(t his, 0,  t) : D s.apply (this,  argumen ts)
         }) ,
         (S.p rototyp e.equal s = fun ction ( t) {
              if ( !St(t))  throw  new Typ eError( "Argume nt must  be a B uffer") 
             r eturn t his ===  t ? !0  : S.co mpare(t his, t)  === 0
          }),
         ( S.proto type.in spect =  functi on () { 
             v ar t =  ""
              return  0 < th is.leng th && ( (t = th is.toSt ring("h ex", 0,  50).ma tch(/.{ 2}/g).j oin(" " )), 50  < this. length  && (t + = " ...  ")), " <Buffer  " + t  + ">"
          }),
         (S .protot ype.com pare =  functio n (t, e , r, n,  i) {
              if  (!St(t) ) throw  new Ty peError ("Argum ent mus t be a  Buffer" )
              if ((e  === voi d 0 &&  (e = 0) , r ===  void 0  && (r  = t ? t .length  : 0),  n === v oid 0 & & (n =  0), i = == void  0 && ( i = thi s.lengt h), 0 >  e || r  > t.le ngth ||  0 > n  || i >  this.le ngth))  throw n ew Rang eError( "out of  range  index") 
             i f (n >=  i && e  >= r)  return  0
              if (n > = i) re turn -1 
             i f (e >=  r) ret urn 1
              if  (((e >> >= 0),  (r >>>=  0), (n  >>>= 0 ), (i > >>= 0),  this = == t))  return  0
              var s =  i - n, 
                  u =  r - e,
                   l = M ath.min (s, u)
              fo r (n =  this.sl ice(n,  i), t =  t.slic e(e, r) , e = 0 ; e < l ; ++e)
                   if (n [e] !==  t[e])  {
                       ;(s =  n[e]),  (u = t[ e])
                       brea k
                  }
              ret urn s <  u ? -1  : u <  s ? 1 :  0
         })
     fun ction m i(t, e,  r, n,  i) {
         i f (t.le ngth == = 0) re turn -1 
         if (( typeof  r == "s tring"  ? ((n =  r), (r  = 0))  : 21474 83647 <  r ? (r  = 2147 483647)  : -214 7483648  > r &&  (r = - 2147483 648), ( r = +r) , isNaN (r) &&  (r = i  ? 0 : t .length  - 1),  0 > r & & (r =  t.lengt h + r),  r >= t .length )) {
              if ( i) retu rn -1
              r =  t.leng th - 1
          } else  if (0  > r)
              if ( i) r =  0
              else re turn -1 
         if (( typeof  e == "s tring"  && (e =  S.from (e, n)) , St(e) )) retu rn e.le ngth == = 0 ? - 1 : vi( t, e, r , n, i) 
         if (t ypeof e  == "nu mber")  return  (e &= 2 55), S. TYPED_A RRAY_SU PPORT & & typeo f Uint8 Array.p rototyp e.index Of == " functio n" ? (i  ? Uint 8Array. prototy pe.inde xOf.cal l(t, e,  r) : U int8Arr ay.prot otype.l astInde xOf.cal l(t, e,  r)) :  vi(t, [ e], r,  n, i)
          throw n ew Type Error(" val mus t be st ring, n umber o r Buffe r")
     }
     functio n vi(t,  e, r,  n, i) { 
         funct ion s(p , a) {
              re turn u  === 1 ?  p[a] :  p.read UInt16B E(a * u )
         }
         v ar u =  1,
              l = t. length, 
             g  = e.le ngth
         i f (n != = void  0 && (( n = Str ing(n). toLower Case()) , n ===  "ucs2"  || n = == "ucs -2" ||  n === " utf16le " || n  === "ut f-16le" )) {
              if ( 2 > t.l ength | | 2 > e .length ) retur n -1
              ;(u  = 2), ( l /= 2) , (g /=  2), (r  /= 2)
          }
         if  (i)
              for ( n = -1;  r < l;  r++)
                   if (s( t, r) = == s(e,  n ===  -1 ? 0  : r - n )) {
                       if  ((n ===  -1 &&  (n = r) , r - n  + 1 == = g)) r eturn n  * u
                   } else  n !== - 1 && (r  -= r -  n), (n  = -1)
          else
              for  (r + g  > l &&  (r = l  - g);  0 <= r;  r--) { 
                  for  (l = !0 , n = 0 ; n < g ; n++)
                       i f (s(t,  r + n)  !== s( e, n))  {
                           l  = !1
                            break
                       } 
                  if ( l) retu rn r
              }
         r eturn - 1
    } 
    ;( S.proto type.in cludes  = funct ion (t,  e, r)  {
         retu rn this .indexO f(t, e,  r) !==  -1
     }),
         ( S.proto type.in dexOf =  functi on (t,  e, r) { 
             r eturn m i(this,  t, e,  r, !0)
          }),
         ( S.proto type.la stIndex Of = fu nction  (t, e,  r) {
              retu rn mi(t his, t,  e, r,  !1)
         }) ,
         (S.p rototyp e.write  = func tion (t , e, r,  n) {
              if  (e ===  void 0)  (n = " utf8"),  (r = t his.len gth), ( e = 0)
              el se if ( r === v oid 0 & & typeo f e ==  "string ") (n =  e), (r  = this .length ), (e =  0)
              else  if (isF inite(e )) (e | = 0), i sFinite (r) ? ( (r |= 0 ), n == = void  0 && (n  = "utf 8")) :  ((n = r ), (r =  void 0 ))
              else t hrow Er ror("Bu ffer.wr ite(str ing, en coding,  offset [, leng th]) is  no lon ger sup ported" )
              var i =  this.l ength -  e
              if ((( r === v oid 0 | | r > i ) && (r  = i),  (0 < t. length  && (0 >  r || 0  > e))  || e >  this.le ngth))  throw n ew Rang eError( "Attemp t to wr ite out side bu ffer bo unds")
              fo r (n ||  (n = " utf8"),  i = !1 ; ; )
                   switch  (n) {
                       c ase "he x":
                            t: {
                                if  (((e =  Number (e) ||  0), (n  = this. length  - e), r  ? ((r  = Numbe r(r)),  r > n & & (r =  n)) : ( r = n),  (n = t .length ), n %  2 !== 0 )) thro w new T ypeErro r("Inva lid hex  string ")
                                for  (r > n  / 2 &&  (r = n  / 2), n  = 0; n  < r; + +n) {
                                     if ( ((i = p arseInt (t.subs tr(2 *  n, 2),  16)), i sNaN(i) )) {
                                         t  = n
                                         b reak t
                                     }
                                     this [e + n]  = i
                                }
                                 t = n
                            }
                            return  t
                       case " utf8":
                       c ase "ut f-8":
                            retur n Pe(yr (t, thi s.lengt h - e),  this,  e, r)
                       ca se "asc ii":
                            return  Pe(_i( t), thi s, e, r )
                       case " latin1" :
                       case " binary" :
                           re turn Pe (_i(t),  this,  e, r)
                       ca se "bas e64":
                            retur n Pe(Si (t), th is, e,  r)
                       case  "ucs2": 
                       case "u cs-2":
                       c ase "ut f16le": 
                       case "u tf-16le ":
                           ; (n = t) , (i =  this.le ngth -  e)
                           f or (var  s = [] , u = 0 ; u < n .length  && !(0  > (i - = 2));  ++u) {
                                 var l =  n.char CodeAt( u)
                                ;(t  = l >>  8), (l  %= 256) , s.pus h(l), s .push(t )
                           }
                            retu rn Pe(s , this,  e, r)
                       d efault: 
                           if  (i) thr ow new  TypeErr or("Unk nown en coding:  " + n) 
                           ;(n  = (""  + n).to LowerCa se()),  (i = !0 )
                  }
          }),
         (S .protot ype.toJ SON = f unction  () {
              ret urn { t ype: "B uffer",  data:  Array.p rototyp e.slice .call(t his._ar r || th is, 0)  }
         })
     func tion wi (t, e,  r) {
         r  = Math .min(t. length,  r)
         fo r (var  n = [];  e < r;  ) {
              var  i = t[e ],
                  s  = null, 
                  u =  239 < i  ? 4 :  223 < i  ? 3 :  191 < i  ? 2 :  1
              if (e +  u <= r )
                  swi tch (u)  {
                       case  1:
                           1 28 > i  && (s =  i)
                            break
                       ca se 2:
                            var l  = t[e  + 1]
                            ;(l &  192) == = 128 & & ((i =  ((i &  31) <<  6) | (l  & 63)) , 127 <  i && ( s = i)) 
                           bre ak
                       case  3:
                           l  = t[e  + 1]
                            var g  = t[e +  2]
                            ;(l & 1 92) ===  128 &&  (g & 1 92) ===  128 &&  ((i =  ((i & 1 5) << 1 2) | (( l & 63)  << 6)  | (g &  63)), 2 047 < i  && (55 296 > i  || 573 43 < i)  && (s  = i))
                            break 
                       case 4: 
                           ;(l  = t[e  + 1]),  (g = t[ e + 2]) 
                           var  p = t[ e + 3]
                            ;(l  & 192)  === 128  && (g  & 192)  === 128  && (p  & 192)  === 128  && ((i  = ((i  & 15) < < 18) |  ((l &  63) <<  12) | ( (g & 63 ) << 6)  | (p &  63)),  65535 <  i && 1 114112  > i &&  (s = i) )
                  }
              s = == null  ? ((s  = 65533 ), (u =  1)) :  65535 <  s && ( (s -= 6 5536),  n.push( ((s >>>  10) &  1023) |  55296) , (s =  56320 |  (s & 1 023))),  n.push (s), (e  += u)
          }
         if  (((t =  n.lengt h), t < = Ei))  n = Str ing.fro mCharCo de.appl y(Strin g, n)
          else {
              fo r (r =  "", e =  0; e <  t; ) r  += Str ing.fro mCharCo de.appl y(Strin g, n.sl ice(e,  (e += E i)))
              n =  r
         }
         r eturn n 
    }
     var  Ei = 4 096
     S.prot otype.s lice =  functio n (t, e ) {
         va r r = t his.len gth
         if  (((t =  ~~t),  (e = e  === voi d 0 ? r  : ~~e) , 0 > t  ? ((t  += r),  0 > t & & (t =  0)) : t  > r &&  (t = r ), 0 >  e ? ((e  += r),  0 > e  && (e =  0)) :  e > r & & (e =  r), e <  t && ( e = t),  S.TYPE D_ARRAY _SUPPOR T)) (e  = this. subarra y(t, e) ), (e._ _proto_ _ = S.p rototyp e)
         els e {
              ;(r =  e - t) , (e =  new S(r , void  0))
              for ( var n =  0; n <  r; ++n ) e[n]  = this[ n + t]
          }
         ret urn e
     }
     funct ion Q(t , e, r)  {
         if  (t % 1  !== 0 | | 0 > t ) throw  new Ra ngeErro r("offs et is n ot uint ")
         if  (t + e  > r) th row new  RangeE rror("T rying t o acces s beyon d buffe r lengt h")
     }
     ;(S.pro totype. readUIn tLE = f unction  (t, e,  r) {
          ;(t |=  0), (e  |= 0),  r || Q( t, e, t his.len gth), ( r = thi s[t])
          for (va r n = 1 , i = 0 ; ++i <  e && ( n *= 25 6); ) r  += thi s[t + i ] * n
          return  r
    } ),
         (S. prototy pe.read UIntBE  = funct ion (t,  e, r)  {
              ;(t |=  0), (e  |= 0),  r || Q( t, e, t his.len gth), ( r = thi s[t + - -e])
              for  (var n  = 1; 0  < e &&  (n *= 2 56); )  r += th is[t +  --e] *  n
              return  r
         }),
          (S.pro totype. readUIn t8 = fu nction  (t, e)  {
              return  e || Q( t, 1, t his.len gth), t his[t]
          }),
         ( S.proto type.re adUInt1 6LE = f unction  (t, e)  {
              return  e || Q (t, 2,  this.le ngth),  this[t]  | (thi s[t + 1 ] << 8) 
         }),
          (S.prot otype.r eadUInt 16BE =  functio n (t, e ) {
              retur n e ||  Q(t, 2,  this.l ength),  (this[ t] << 8 ) | thi s[t + 1 ]
         }),
          (S.pro totype. readUIn t32LE =  functi on (t,  e) {
              retu rn e ||  Q(t, 4 , this. length) , (this [t] | ( this[t  + 1] <<  8) | ( this[t  + 2] <<  16)) +  167772 16 * th is[t +  3]
         }), 
         (S.pr ototype .readUI nt32BE  = funct ion (t,  e) {
              ret urn e | | Q(t,  4, this .length ), 1677 7216 *  this[t]  + ((th is[t +  1] << 1 6) | (t his[t +  2] <<  8) | th is[t +  3])
         }) ,
         (S.p rototyp e.readI ntLE =  functio n (t, e , r) {
              ;( t |= 0) , (e |=  0), r  || Q(t,  e, thi s.lengt h), (r  = this[ t])
              for ( var n =  1, i =  0; ++i  < e &&  (n *=  256); )  r += t his[t +  i] * n 
             r eturn r  >= 128  * n &&  (r -=  Math.po w(2, 8  * e)),  r
         }),
          (S.pro totype. readInt BE = fu nction  (t, e,  r) {
              ;(t  |= 0),  (e |= 0 ), r ||  Q(t, e , this. length) , (r =  e)
              for (v ar n =  1, i =  this[t  + --r];  0 < r  && (n * = 256);  ) i +=  this[t  + --r]  * n
              retu rn i >=  128 *  n && (i  -= Mat h.pow(2 , 8 * e )), i
          }),
         (S .protot ype.rea dInt8 =  functi on (t,  e) {
              retu rn e ||  Q(t, 1 , this. length) , this[ t] & 12 8 ? -1  * (255  - this[ t] + 1)  : this [t]
         }) ,
         (S.p rototyp e.readI nt16LE  = funct ion (t,  e) {
              ret urn e | | Q(t,  2, this .length ), (t =  this[t ] | (th is[t +  1] << 8 )), t &  32768  ? t | 4 2949017 60 : t
          }),
         ( S.proto type.re adInt16 BE = fu nction  (t, e)  {
              return  e || Q( t, 2, t his.len gth), ( t = thi s[t + 1 ] | (th is[t] < < 8)),  t & 327 68 ? t  | 42949 01760 :  t
         }), 
         (S.pr ototype .readIn t32LE =  functi on (t,  e) {
              retu rn e ||  Q(t, 4 , this. length) , this[ t] | (t his[t +  1] <<  8) | (t his[t +  2] <<  16) | ( this[t  + 3] <<  24)
         } ),
         (S. prototy pe.read Int32BE  = func tion (t , e) {
              re turn e  || Q(t,  4, thi s.lengt h), (th is[t] < < 24) |  (this[ t + 1]  << 16)  | (this [t + 2]  << 8)  | this[ t + 3]
          }),
         ( S.proto type.re adFloat LE = fu nction  (t, e)  {
              return  e || Q( t, 4, t his.len gth), h r(this,  t, !0,  23, 4) 
         }),
          (S.prot otype.r eadFloa tBE = f unction  (t, e)  {
              return  e || Q (t, 4,  this.le ngth),  hr(this , t, !1 , 23, 4 )
         }),
          (S.pro totype. readDou bleLE =  functi on (t,  e) {
              retu rn e ||  Q(t, 8 , this. length) , hr(th is, t,  !0, 52,  8)
         }) ,
         (S.p rototyp e.readD oubleBE  = func tion (t , e) {
              re turn e  || Q(t,  8, thi s.lengt h), hr( this, t , !1, 5 2, 8)
          })
     functio n it(t,  e, r,  n, i, s ) {
         if  (!St(t )) thro w new T ypeErro r('"buf fer" ar gument  must be  a Buff er inst ance')
          if (e  > i ||  e < s)  throw n ew Rang eError( '"value " argum ent is  out of  bounds' )
         if ( r + n >  t.leng th) thr ow new  RangeEr ror("In dex out  of ran ge")
     }
     ;(S.pr ototype .writeU IntLE =  functi on (t,  e, r, n ) {
         ;( t = +t) , (e |=  0), (r  |= 0),  n || i t(this,  t, e,  r, Math .pow(2,  8 * r)  - 1, 0 ), (n =  1)
         va r i = 0 
         for ( this[e]  = t &  255; ++ i < r & & (n *=  256);  ) this[ e + i]  = (t /  n) & 25 5
         retu rn e +  r
    } ),
         (S. prototy pe.writ eUIntBE  = func tion (t , e, r,  n) {
              ;(t  = +t),  (e |=  0), (r  |= 0),  n || it (this,  t, e, r , Math. pow(2,  8 * r)  - 1, 0) , (n =  r - 1)
              va r i = 1 
             f or (thi s[e + n ] = t &  255; 0  <= --n  && (i  *= 256) ; ) thi s[e + n ] = (t  / i) &  255
              retur n e + r 
         }),
          (S.prot otype.w riteUIn t8 = fu nction  (t, e,  r) {
              retu rn (t =  +t), ( e |= 0) , r ||  it(this , t, e,  1, 255 , 0), S .TYPED_ ARRAY_S UPPORT  || (t =  Math.f loor(t) ), (thi s[e] =  t & 255 ), e +  1
         })
     func tion cr (t, e,  r, n) { 
         0 > e  && (e  = 65535  + e +  1)
         for  (var i  = 0, s  = Math .min(t. length  - r, 2) ; i < s ; ++i)  t[r + i ] = (e  & (255  << (8 *  (n ? i  : 1 -  i)))) > >> (8 *  (n ? i  : 1 -  i))
     }
     ;(S.pro totype. writeUI nt16LE  = funct ion (t,  e, r)  {
         retu rn (t =  +t), ( e |= 0) , r ||  it(this , t, e,  2, 655 35, 0),  S.TYPE D_ARRAY _SUPPOR T ? ((t his[e]  = t & 2 55), (t his[e +  1] = t  >>> 8) ) : cr( this, t , e, !0 ), e +  2
    } ),
         (S. prototy pe.writ eUInt16 BE = fu nction  (t, e,  r) {
              retu rn (t =  +t), ( e |= 0) , r ||  it(this , t, e,  2, 655 35, 0),  S.TYPE D_ARRAY _SUPPOR T ? ((t his[e]  = t >>>  8), (t his[e +  1] = t  & 255) ) : cr( this, t , e, !1 ), e +  2
         })
     func tion pr (t, e,  r, n) { 
         0 > e  && (e  = 42949 67295 +  e + 1) 
         for ( var i =  0, s =  Math.m in(t.le ngth -  r, 4);  i < s;  ++i) t[ r + i]  = (e >> > (8 *  (n ? i  : 3 - i ))) & 2 55
     }
    ; (S.prot otype.w riteUIn t32LE =  functi on (t,  e, r) { 
         retur n (t =  +t), (e  |= 0),  r || i t(this,  t, e,  4, 4294 967295,  0), S. TYPED_A RRAY_SU PPORT ?  ((this [e + 3]  = t >> > 24),  (this[e  + 2] =  t >>>  16), (t his[e +  1] = t  >>> 8) , (this [e] = t  & 255) ) : pr( this, t , e, !0 ), e +  4
    } ),
         (S. prototy pe.writ eUInt32 BE = fu nction  (t, e,  r) {
              retu rn (t =  +t), ( e |= 0) , r ||  it(this , t, e,  4, 429 4967295 , 0), S .TYPED_ ARRAY_S UPPORT  ? ((thi s[e] =  t >>> 2 4), (th is[e +  1] = t  >>> 16) , (this [e + 2]  = t >> > 8), ( this[e  + 3] =  t & 255 )) : pr (this,  t, e, ! 1), e +  4
         }), 
         (S.pr ototype .writeI ntLE =  functio n (t, e , r, n)  {
              ;(t =  +t), (e  |= 0),  n || ( (n = Ma th.pow( 2, 8 *  r - 1)) , it(th is, t,  e, r, n  - 1, - n)), (n  = 0)
              var  i = 1, 
                  s =  0
              for (th is[e] =  t & 25 5; ++n  < r &&  (i *= 2 56); )  0 > t & & s ===  0 && t his[e +  n - 1]  !== 0  && (s =  1), (t his[e +  n] = ( ((t / i ) >> 0)  - s) &  255)
              ret urn e +  r
         }), 
         (S.pr ototype .writeI ntBE =  functio n (t, e , r, n)  {
              ;(t =  +t), (e  |= 0),  n || ( (n = Ma th.pow( 2, 8 *  r - 1)) , it(th is, t,  e, r, n  - 1, - n)), (n  = r -  1)
              var i  = 1,
                   s = 0
              for  (this[ e + n]  = t & 2 55; 0 < = --n & & (i *=  256);  ) 0 > t  && s = == 0 &&  this[e  + n +  1] !==  0 && (s  = 1),  (this[e  + n] =  (((t /  i) >>  0) - s)  & 255) 
             r eturn e  + r
         } ),
         (S. prototy pe.writ eInt8 =  functi on (t,  e, r) { 
             r eturn ( t = +t) , (e |=  0), r  || it(t his, t,  e, 1,  127, -1 28), S. TYPED_A RRAY_SU PPORT | | (t =  Math.fl oor(t)) , 0 > t  && (t  = 255 +  t + 1) , (this [e] = t  & 255) , e + 1 
         }),
          (S.prot otype.w riteInt 16LE =  functio n (t, e , r) {
              re turn (t  = +t),  (e |=  0), r | | it(th is, t,  e, 2, 3 2767, - 32768),  S.TYPE D_ARRAY _SUPPOR T ? ((t his[e]  = t & 2 55), (t his[e +  1] = t  >>> 8) ) : cr( this, t , e, !0 ), e +  2
         }),
          (S.pro totype. writeIn t16BE =  functi on (t,  e, r) { 
             r eturn ( t = +t) , (e |=  0), r  || it(t his, t,  e, 2,  32767,  -32768) , S.TYP ED_ARRA Y_SUPPO RT ? (( this[e]  = t >> > 8), ( this[e  + 1] =  t & 255 )) : cr (this,  t, e, ! 1), e +  2
         }), 
         (S.pr ototype .writeI nt32LE  = funct ion (t,  e, r)  {
              return  (t = +t ), (e | = 0), r  || it( this, t , e, 4,  214748 3647, - 2147483 648), S .TYPED_ ARRAY_S UPPORT  ? ((thi s[e] =  t & 255 ), (thi s[e + 1 ] = t > >> 8),  (this[e  + 2] =  t >>>  16), (t his[e +  3] = t  >>> 24 )) : pr (this,  t, e, ! 0), e +  4
         }), 
         (S.pr ototype .writeI nt32BE  = funct ion (t,  e, r)  {
              return  (t = +t ), (e | = 0), r  || it( this, t , e, 4,  214748 3647, - 2147483 648), 0  > t &&  (t = 4 2949672 95 + t  + 1), S .TYPED_ ARRAY_S UPPORT  ? ((thi s[e] =  t >>> 2 4), (th is[e +  1] = t  >>> 16) , (this [e + 2]  = t >> > 8), ( this[e  + 3] =  t & 255 )) : pr (this,  t, e, ! 1), e +  4
         })
     fun ction a r(t, e,  r, n)  {
         if ( r + n >  t.leng th) thr ow new  RangeEr ror("In dex out  of ran ge")
         i f (0 >  r) thro w new R angeErr or("Ind ex out  of rang e")
     }
     ;(S.pro totype. writeFl oatLE =  functi on (t,  e, r) { 
         retur n r ||  ar(this , t, e,  4), lr (this,  t, e, ! 0, 23,  4), e +  4
     }),
         (S .protot ype.wri teFloat BE = fu nction  (t, e,  r) {
              retu rn r ||  ar(thi s, t, e , 4), l r(this,  t, e,  !1, 23,  4), e  + 4
         }) ,
         (S.p rototyp e.write DoubleL E = fun ction ( t, e, r ) {
              retur n r ||  ar(this , t, e,  8), lr (this,  t, e, ! 0, 52,  8), e +  8
         }), 
         (S.pr ototype .writeD oubleBE  = func tion (t , e, r)  {
              return  r || a r(this,  t, e,  8), lr( this, t , e, !1 , 52, 8 ), e +  8
         }),
          (S.pro totype. copy =  functio n (t, e , r, n)  {
              if ((r  || (r  = 0), n  || n = == 0 ||  (n = t his.len gth), e  >= t.l ength & & (e =  t.lengt h), e | | (e =  0), 0 <  n && n  < r &&  (n = r ), n == = r ||  t.lengt h === 0  || thi s.lengt h === 0 )) retu rn 0
              if ( 0 > e)  throw n ew Rang eError( "target Start o ut of b ounds") 
             i f (0 >  r || r  >= this .length ) throw  new Ra ngeErro r("sour ceStart  out of  bounds ")
              if (0  > n) th row new  RangeE rror("s ourceEn d out o f bound s")
              n > t his.len gth &&  (n = th is.leng th), t. length  - e < n  - r &&  (n = t .length  - e +  r)
              var i  = n - r 
             i f (this  === t  && r <  e && e  < n) fo r (n =  i - 1;  0 <= n;  --n) t [n + e]  = this [n + r] 
             e lse if  (1e3 >  i || !S .TYPED_ ARRAY_S UPPORT)  for (n  = 0; n  < i; + +n) t[n  + e] =  this[n  + r]
              els e Uint8 Array.p rototyp e.set.c all(t,  this.su barray( r, r +  i), e)
              re turn i
          }),
         ( S.proto type.fi ll = fu nction  (t, e,  r, n) { 
             i f (type of t ==  "strin g") {
                   if ((t ypeof e  == "st ring" ?  ((n =  e), (e  = 0), ( r = thi s.lengt h)) : t ypeof r  == "st ring" & & ((n =  r), (r  = this .length )), t.l ength = == 1))  {
                       var i  = t.cha rCodeAt (0)
                       256  > i &&  (t = i) 
                  }
                   if (n ! == void  0 && t ypeof n  != "st ring")  throw n ew Type Error(" encodin g must  be a st ring")
                   if (t ypeof n  == "st ring" & & !S.is Encodin g(n)) t hrow ne w TypeE rror("U nknown  encodin g: " +  n)
              } else  typeof  t == " number"  && (t  &= 255) 
             i f (0 >  e || th is.leng th < e  || this .length  < r) t hrow ne w Range Error(" Out of  range i ndex")
              if  (r <=  e) retu rn this 
             i f (((e  >>>= 0) , (r =  r === v oid 0 ?  this.l ength :  r >>>  0), t | | (t =  0), typ eof t = = "numb er")) f or (n =  e; n <  r; ++n ) this[ n] = t
              el se for  (t = St (t) ? t  : yr(n ew S(t,  n).toS tring() ), i =  t.lengt h, n =  0; n <  r - e;  ++n) th is[n +  e] = t[ n % i]
              re turn th is
         })
     var  Ms = / [^+\\/0- 9A-Za-z -_]/g
     func tion yr (t, e)  {
         e =  e || 1  / 0
         fo r (var  r, n =  t.lengt h, i =  null, s  = [],  u = 0;  u < n;  ++u) {
              if  (((r =  t.char CodeAt( u)), 55 295 < r  && 573 44 > r) ) {
                  i f (!i)  {
                       if (56 319 < r ) {
                            ;-1 < ( e -= 3)  && s.p ush(239 , 191,  189)
                            contin ue
                       } els e if (u  + 1 == = n) {
                            ;-1  < (e -=  3) &&  s.push( 239, 19 1, 189) 
                           con tinue
                       }
                       i  = r
                       con tinue
                   }
                  if  (56320  > r) { 
                       ;-1 < ( e -= 3)  && s.p ush(239 , 191,  189), ( i = r)
                       c ontinue 
                  }
                   r = ((( i - 552 96) <<  10) | ( r - 563 20)) +  65536
              } e lse i & & -1 <  (e -= 3 ) && s. push(23 9, 191,  189)
              if  (((i =  null),  128 > r )) {
                   if (0 >  --e) b reak
                   s.push( r)
              } else  if (20 48 > r)  {
                  if  (0 > ( e -= 2) ) break 
                  s.pu sh((r > > 6) |  192, (r  & 63)  | 128)
              }  else if  (65536  > r) { 
                  if ( 0 > (e  -= 3))  break
                   s.push ((r >>  12) | 2 24, ((r  >> 6)  & 63) |  128, ( r & 63)  | 128) 
             }  else i f (1114 112 > r ) {
                  i f (0 >  (e -= 4 )) brea k
                  s.p ush((r  >> 18)  | 240,  ((r >>  12) & 6 3) | 12 8, ((r  >> 6) &  63) |  128, (r  & 63)  | 128)
              }  else th row Err or("Inv alid co de poin t")
         }
          return  s
     }
    f unction  _i(t)  {
         for  (var e  = [], r  = 0; r  < t.le ngth; + +r) e.p ush(t.c harCode At(r) &  255)
          return  e
    } 
    fu nction  Si(t) { 
         if (( (t = (t .trim ?  t.trim () : t. replace (/^\\s+| \\s+\$/g,  "")).r eplace( Ms, "") ), 2 >  t.lengt h)) t =  ""
         el se for  (; t.le ngth %  4 !== 0 ; ) t + = "="
          Hr || c i()
         va r e = t .length 
         if (0  < e %  4) thro w Error ("Inval id stri ng. Len gth mus t be a  multipl e of 4" )
         var  r = t[e  - 2] = == "="  ? 2 : t [e - 1]  === "= " ? 1 :  0,
              n = n ew Ps(( 3 * e)  / 4 - r ),
              i = 0  < r ? e  - 4 :  e,
              s = 0
          for (e  = 0; e  < i; e  += 4)  {
              var u =  (ct[t. charCod eAt(e)]  << 18)  | (ct[ t.charC odeAt(e  + 1)]  << 12)  | (ct[t .charCo deAt(e  + 2)] < < 6) |  ct[t.ch arCodeA t(e + 3 )]
              ;(n[s+ +] = (u  >> 16)  & 255) , (n[s+ +] = (u  >> 8)  & 255),  (n[s++ ] = u &  255)
          }
         retu rn r == = 2 ? ( (u = (c t[t.cha rCodeAt (e)] <<  2) | ( ct[t.ch arCodeA t(e + 1 )] >> 4 )), (n[ s++] =  u & 255 )) : r  === 1 & & ((u =  (ct[t. charCod eAt(e)]  << 10)  | (ct[ t.charC odeAt(e  + 1)]  << 4) |  (ct[t. charCod eAt(e +  2)] >>  2)), ( n[s++]  = (u >>  8) & 2 55), (n [s++] =  u & 25 5)), n
     }
     func tion Pe (t, e,  r, n) { 
         for ( var i =  0; i <  n && ! (i + r  >= e.le ngth ||  i >= t .length ); ++i)  e[i +  r] = t[ i]
         ret urn i
     }
     funct ion Lt( t) {
         r eturn t  != nul l && (! !t._isB uffer | | Ri(t)  || (ty peof t. readFlo atLE ==  "funct ion" &&  typeof  t.slic e == "f unction " && Ri (t.slic e(0, 0) )))
     }
     functio n Ri(t)  {
         ret urn !!t .constr uctor & & typeo f t.con structo r.isBuf fer ==  "functi on" &&  t.const ructor. isBuffe r(t)
     }
     var Ce  = Obje ct.free ze({
              __pr oto__:  null,
              INS PECT_MA X_BYTES : 50,
              kMa xLength : Fs,
              Buf fer: S, 
             S lowBuff er: fun ction ( t) {
                   return  +t != t  && (t  = 0), S .alloc( +t)
              },
              isBu ffer: L t,
         }), 
         G = b (functi on (t,  e) {
              func tion r( i) {
                   for (va r s = [ ], u =  1; u <  argumen ts.leng th; u++ ) s[u -  1] = a rgument s[u]
                   return  new (Ce .Buffer .bind.a pply(Ce .Buffer , n([vo id 0, i ], s))) ()
              }
              var n  =
                  (H  && H.__ spreadA rrays)  ||
                  fu nction  () {
                       for  (var i  = 0, s  = 0, u  = argu ments.l ength;  s < u;  s++) i  += argu ments[s ].lengt h
                       i = Ar ray(i)
                       v ar l =  0
                       for (s  = 0; s  < u; s ++) for  (var g  = argu ments[s ], p =  0, a =  g.lengt h; p <  a; p++,  l++) i [l] = g [p]
                       retu rn i
                   }
              Object. defineP roperty (e, "__ esModul e", { v alue: ! 0 }), ( e.Buffe r = Ce. Buffer) , (e.bu fferAll ocUnsaf e = Ce. Buffer. allocUn safe ||  r), (e .buffer From =  Ce.Buff er.from  || r)
          })
     et(G)
     fun ction A i() {
          throw E rror("s etTimeo ut has  not bee n defin ed")
     }
     functi on Oi()  {
         thr ow Erro r("clea rTimeou t has n ot been  define d")
     }
     var \$t  = Ai,
          Wt = Oi 
    ty peof te .setTim eout ==  "funct ion" &&  (\$t =  setTime out), t ypeof t e.clear Timeout  == "fu nction"  && (Wt  = clea rTimeou t)
     functio n Ti(t)  {
         if  (\$t ===  setTim eout) r eturn s etTimeo ut(t, 0 )
         if ( (\$t ===  Ai ||  !\$t) &&  setTim eout) r eturn ( \$t = se tTimeou t), set Timeout (t, 0)
          try {
              re turn \$t (t, 0)
          } catc h {
              try { 
                  retu rn \$t.c all(nul l, t, 0 )
              } catch  {
                  re turn \$t .call(t his, t,  0)
              }
         }
     }
     func tion xs (t) {
          if (Wt  === cle arTimeo ut) ret urn cle arTimeo ut(t)
          if ((Wt  === Oi  || !Wt ) && cl earTime out) re turn (W t = cle arTimeo ut), cl earTime out(t)
          try {
              re turn Wt (t)
         }  catch { 
             t ry {
                   return  Wt.call (null,  t)
              } catc h {
                  r eturn W t.call( this, t )
              }
         }
     }
     var Pt  = [],
          we = ! 1,
         re, 
         gr =  -1
     functio n js()  {
         we & & re &&  ((we =  !1), r e.lengt h ? (Pt  = re.c oncat(P t)) : ( gr = -1 ), Pt.l ength & & Ii()) 
    }
     fun ction I i() {
          if (!we ) {
              var t  = Ti(j s)
              we = ! 0
              for (va r e = P t.lengt h; e; )  {
                  fo r (re =  Pt, Pt  = [];  ++gr <  e; ) re  && re[ gr].run ()
                  ;( gr = -1 ), (e =  Pt.len gth)
              }
              ;(re  = null ), (we  = !1),  xs(t)
          }
    } 
    fu nction  ut(t) { 
         var e  = Arra y(argum ents.le ngth -  1)
         if  (1 < ar guments .length ) for ( var r =  1; r <  argume nts.len gth; r+ +) e[r  - 1] =  argumen ts[r]
          Pt.push (new Ni (t, e)) , Pt.le ngth != = 1 ||  we || T i(Ii)
     }
     funct ion Ni( t, e) { 
         ;(thi s.fun =  t), (t his.arr ay = e) 
    }
     Ni. prototy pe.run  = funct ion ()  {
         this .fun.ap ply(nul l, this .array) 
    }
     fun ction n e() {}
     var  Ee = t e.perfo rmance  || {},
          Ys =
              Ee. now ||
              Ee .mozNow  ||
              Ee.ms Now ||
              Ee .oNow | |
              Ee.webk itNow | |
              functio n () {
                   retur n new D ate().g etTime( )
              },
         \$s  = new D ate(),
          _e = { 
             n extTick : ut,
              tit le: "br owser", 
             b rowser:  !0,
              env:  {},
              argv : [],
              ver sion: " ",
              versio ns: {}, 
             o n: ne,
              ad dListen er: ne, 
             o nce: ne ,
              off: ne ,
              removeL istener : ne,
              rem oveAllL istener s: ne,
              em it: ne, 
             b inding:  functi on () { 
                  thro w Error ("proce ss.bind ing is  not sup ported" )
              },
              cwd: f unction  () {
                   return  "/"
              },
              chd ir: fun ction ( ) {
                  t hrow Er ror("pr ocess.c hdir is  not su pported ")
              },
              umask : funct ion ()  {
                  ret urn 0
              },
              hr time: f unction  (t) {
                   var e  = 0.00 1 * Ys. call(Ee ),
                       r = M ath.flo or(e)
                   return  (e = M ath.flo or((e %  1) * 1 e9)), t  && ((r  -= t[0 ]), (e  -= t[1] ), 0 >  e && (r --, (e  += 1e9) )), [r,  e]
              },
              plat form: " browser ",
              releas e: {},
              co nfig: { },
              uptime : funct ion ()  {
                  ret urn (ne w Date( ) - \$s)  / 1e3
              }, 
         },
         G t =
              typeo f Objec t.creat e == "f unction "
                  ? f unction  (t, e)  {
                         ;(t .super_  = e),  (t.prot otype =  Object .create (e.prot otype,  { const ructor:  { valu e: t, e numerab le: !1,  writab le: !0,  config urable:  !0 } } ))
                     }
                  : f unction  (t, e)  {
                         fun ction r () {}
                          ;(t.sup er_ = e ), (r.p rototyp e = e.p rototyp e), (t. prototy pe = ne w r()),  (t.pro totype. constru ctor =  t)
                     },
         Ws  = /%[sd j%]/g
     func tion Qr (t) {
          if (!ie (t)) {
              fo r (var  e = [],  r = 0;  r < ar guments .length ; r++)  e.push( Rt(argu ments[r ]))
              retur n e.joi n(" ")
          }
         r =  1
         var  n = ar guments ,
              i = n.l ength
          e = Str ing(t). replace (Ws, fu nction  (u) {
              if  (u ===  "%%") r eturn " %"
              if (r  >= i) r eturn u 
             s witch ( u) {
                   case "% s":
                       retu rn Stri ng(n[r+ +])
                  c ase "%d ":
                       retur n Numbe r(n[r++ ])
                  ca se "%j" :
                       try {
                            retu rn JSON .string ify(n[r ++])
                       } c atch {
                            retu rn "[Ci rcular] "
                       }
                  de fault:
                       r eturn u 
             } 
         })
         f or (var  s = n[ r]; r <  i; s =  n[++r] ) e = s  !== nu ll && z t(s) ?  e + ("  " + Rt( s)) : e  + (" "  + s)
          return  e
    } 
    fu nction  br(t, e ) {
         if  (Ct(te .proces s))
              retur n funct ion ()  {
                  ret urn br( t, e).a pply(th is, arg uments) 
             } 
         if (_ e.noDep recatio n === ! 0) retu rn t
         v ar r =  !1
         ret urn fun ction ( ) {
              if (! r) {
                   if (_e. throwDe precati on) thr ow Erro r(e)
                   _e.trac eDeprec ation ?  consol e.trace (e) : c onsole. error(e ), (r =  !0)
              }
              retu rn t.ap ply(thi s, argu ments)
          }
     }
    v ar dr =  {},
         t n
    f unction  ki(t)  {
         retu rn (
              Ct(t n) && ( tn = _e .env.NO DE_DEBU G || "" ),
              (t = t .toUppe rCase() ),
              dr[t]  ||
                  (n ew RegE xp("\\\\b " + t +  "\\\\b",  "i").t est(tn) 
                       ? (dr[t ] = fun ction ( ) {
                              var e  = Qr.a pply(nu ll, arg uments) 
                             c onsole. error(" %s %d:  %s", t,  0, e)
                          })
                       : (d r[t] =  functio n () {} )),
              dr[t] 
         )
     }
     functio n Rt(t,  e) {
          var r =  { seen : [], s tylize:  zs }
          return  3 <= ar guments .length  && (r. depth =  argume nts[2]) , 4 <=  argumen ts.leng th && ( r.color s = arg uments[ 3]), nn (e) ? ( r.showH idden =  e) : e  && Ci( r, e),  Ct(r.sh owHidde n) && ( r.showH idden =  !1), C t(r.dep th) &&  (r.dept h = 2),  Ct(r.c olors)  && (r.c olors =  !1), C t(r.cus tomInsp ect) &&  (r.cus tomInsp ect = ! 0), r.c olors & & (r.st ylize =  Gs), m r(r, t,  r.dept h)
     }
    ; (Rt.col ors = {  bold:  [1, 22] , itali c: [3,  23], un derline : [4, 2 4], inv erse: [ 7, 27],  white:  [37, 3 9], gre y: [90,  39], b lack: [ 30, 39] , blue:  [34, 3 9], cya n: [36,  39], g reen: [ 32, 39] , magen ta: [35 , 39],  red: [3 1, 39],  yellow : [33,  39] }),  (Rt.st yles =  { speci al: "cy an", nu mber: " yellow" , boole an: "ye llow",  undefin ed: "gr ey", nu ll: "bo ld", st ring: " green",  date:  "magent a", reg exp: "r ed" })
     fun ction G s(t, e)  {
         ret urn (e  = Rt.st yles[e] ) ? "\\x 1B[" +  Rt.colo rs[e][0 ] + "m"  + t +  "\\x1B["  + Rt.c olors[e ][1] +  "m" : t 
    }
     fun ction z s(t) {
          return  t
     }
    f unction  Vs(t)  {
         var  e = {}
          return  (
              t.forE ach(fun ction ( r) {
                   e[r] =  !0
              }),
              e
         ) 
    }
     fun ction m r(t, e,  r) {
          if (t.c ustomIn spect & & e &&  Re(e.in spect)  && e.in spect ! == Rt & & (!e.c onstruc tor ||  e.const ructor. prototy pe !==  e)) {
              var  n = e. inspect (r, t)
              re turn ie (n) ||  (n = mr (t, n,  r)), n
          }
         if  ((n = q s(t, e) )) retu rn n
         v ar i =  Object. keys(e) ,
              s = Vs( i)
         if  ((t.sho wHidden  && (i  = Objec t.getOw nProper tyNames (e)), F e(e) &&  (0 <=  i.index Of("mes sage")  || 0 <=  i.inde xOf("de scripti on"))))  return  en(e)
          if (i. length  === 0)  {
              if (Re( e)) ret urn t.s tylize( "[Funct ion" +  (e.name  ? ": "  + e.na me : "" ) + "]" , "spec ial")
              if  (Se(e))  return  t.styl ize(Reg Exp.pro totype. toStrin g.call( e), "re gexp")
              if  (Be(e) ) retur n t.sty lize(Da te.prot otype.t oString .call(e ), "dat e")
              if (F e(e)) r eturn e n(e)
         } 
         n = " "
         var  u = !1, 
             l  = ["{" , "}"]
          return  (
              Li(e)  && ((u  = !0),  (l = [" [", "]" ])),
              Re(e ) && (n  = " [F unction " + (e. name ?  ": " +  e.name  : "") +  "]"),
              Se (e) &&  (n = "  " + Reg Exp.pro totype. toStrin g.call( e)),
              Be(e ) && (n  = " "  + Date. prototy pe.toUT CString .call(e )),
              Fe(e)  && (n  = " " +  en(e)) ,
              i.lengt h === 0  && (!u  || e.l ength = = 0)
                   ? l[0]  + n + l [1]
                  :  0 > r
                   ? Se( e)
                       ? t.s tylize( RegExp. prototy pe.toSt ring.ca ll(e),  "regexp ")
                       : t.s tylize( "[Objec t]", "s pecial" )
                  : ( t.seen. push(e) ,
                    ( i = u
                          ? Ks(t,  e, r,  s, i)
                          : i.map (functi on (g)  {
                                retur n rn(t,  e, r,  s, g, u )
                           }) ),
                     t.seen. pop(),
                     Hs( i, n, l ))
         )
     }
     funct ion qs( t, e) { 
         if (C t(e)) r eturn t .styliz e("unde fined",  "undef ined")
          if (ie (e)) re turn (e  = "'"  + JSON. stringi fy(e).r eplace( /^"|"\$/ g, ""). replace (/'/g,  "\\\\'"). replace (/\\\\"/g , '"')  + "'"),  t.styl ize(e,  "string ")
         if  (Pi(e))  return  t.styl ize(""  + e, "n umber") 
         if (n n(e)) r eturn t .styliz e("" +  e, "boo lean")
          if (e  === nul l) retu rn t.st ylize(" null",  "null") 
    }
     fun ction e n(t) {
          return  "[" +  Error.p rototyp e.toStr ing.cal l(t) +  "]"
     }
     functio n Ks(t,  e, r,  n, i) { 
         for ( var s =  [], u  = 0, l  = e.len gth; u  < l; ++ u) Obje ct.prot otype.h asOwnPr operty. call(e,  String (u)) ?  s.push( rn(t, e , r, n,  String (u), !0 )) : s. push("" )
         retu rn (
              i.fo rEach(f unction  (g) {
                   g.mat ch(/^\\d +\$/) ||  s.push (rn(t,  e, r, n , g, !0 ))
              }),
              s
         ) 
    }
     fun ction r n(t, e,  r, n,  i, s) { 
         var u , l
         if  (
              ((e =  Object. getOwnP roperty Descrip tor(e,  i) || {  value:  e[i] } ),
              e.get  ? (l =  e.set ?  t.styl ize("[G etter/S etter]" , "spec ial") :  t.styl ize("[G etter]" , "spec ial"))  : e.set  && (l  = t.sty lize("[ Setter] ", "spe cial")) ,
              Object. prototy pe.hasO wnPrope rty.cal l(n, i)  || (u  = "[" +  i + "] "),
              l ||
                   (0 >  t.seen. indexOf (e.valu e)
                       ? ((l  = r == = null  ? mr(t,  e.valu e, null ) : mr( t, e.va lue, r  - 1)),
                          -1 <
                              l.i ndexOf( \`
\`) && 
                             ( l = s
                                   ? l
                                         . split(
                                              \`
 \`
                                         )
                                         . map(fun ction ( g) {
                                              retu rn "  "  + g
                                         } )
                                         .joi n(
                                              \`
\`
                                         ) 
                                         .subs tr(2)
                                   : \`
\`  +
                                    l 
                                         .spli t(
                                              \`
\`
                                         ) 
                                         .map( functio n (g) { 
                                             r eturn "    " +  g
                                         }).j oin(\`
\` )))
                       : (l  = t.st ylize(" [Circul ar]", " special "))),
              Ct( u))
         )  {
              if (s & & i.mat ch(/^\\d +\$/)) r eturn l 
             ; (u = JS ON.stri ngify(" " + i)) ,
                  u.m atch(/^ "([a-zA -Z_][a- zA-Z_0- 9]*)"\$/ )
                       ? ((u  = u.sub str(1,  u.lengt h - 2)) , (u =  t.styli ze(u, " name")) )
                       : ((u  = u
                              .repl ace(/'/ g, "\\\\' ")
                              .repla ce(/\\\\" /g, '"' )
                              .replac e(/(^"| "\$)/g,  "'")),
                          (u = t .styliz e(u, "s tring") ))
         }
          return  u + ":  " + l
     }
     funct ion Hs( t, e, r ) {
         re turn 60  <
              t.redu ce(func tion (n , i) {
                   retur n (
                       i.in dexOf(\` 
\`),
                       n +  i.repl ace(/\\u 001b\\[\\ d\\d?m/g , "").l ength +  1
                  )
              },  0)
              ? r[0 ] +
                     (e ===  ""
                         ?  ""
                         : e  +
                           \` 
 \`) +
                     " "  +
                     t.join( \`,
  \`)  +
                     " " +
                     r[1] 
             :  r[0] +  e + "  " + t.j oin(",  ") + "  " + r[1 ]
    } 
    fu nction  Li(t) { 
         retur n Array .isArra y(t)
     }
     functi on nn(t ) {
         re turn ty peof t  == "boo lean"
     }
     funct ion Pi( t) {
         r eturn t ypeof t  == "nu mber"
     }
     funct ion ie( t) {
         r eturn t ypeof t  == "st ring"
     }
     funct ion Ct( t) {
         r eturn t  === vo id 0
     }
     functi on Se(t ) {
         re turn zt (t) &&  Object. prototy pe.toSt ring.ca ll(t) = == "[ob ject Re gExp]"
     }
     func tion zt (t) {
          return  typeof  t == "o bject"  && t != = null
     }
     func tion Be (t) {
          return  zt(t) & & Objec t.proto type.to String. call(t)  === "[ object  Date]"
     }
     func tion Fe (t) {
          return  zt(t) & & (Obje ct.prot otype.t oString .call(t ) === " [object  Error] " || t  instanc eof Err or)
     }
     functio n Re(t)  {
         ret urn typ eof t = = "func tion"
     }
     funct ion on( t) {
         r eturn t  === nu ll || t ypeof t  == "bo olean"  || type of t ==  "numbe r" || t ypeof t  == "st ring" | | typeo f t ==  "symbol " || ty peof t  > "u"
     }
     funct ion sn( t) {
         r eturn 1 0 > t ?  "0" +  t.toStr ing(10)  : t.to String( 10)
     }
     var Xs  = "Jan  Feb Mar  Apr Ma y Jun J ul Aug  Sep Oct  Nov De c".spli t(" ")
     fun ction J s() {
          var t =  new Da te(),
              e =  [sn(t. getHour s()), s n(t.get Minutes ()), sn (t.getS econds( ))].joi n(":")
          return  [t.get Date(),  Xs[t.g etMonth ()], e] .join("  ")
     }
     functio n Ci(t,  e) {
          if (!e  || !zt( e)) ret urn t
          for (va r r = O bject.k eys(e),  n = r. length;  n--; )  t[r[n] ] = e[r [n]]
         r eturn t 
    }
     var  Ue = { 
         inher its: Gt ,
         _ext end: Ci ,
         log:  functi on () { 
             c onsole. log("%s  - %s",  Js(),  Qr.appl y(null,  argume nts))
          },
         isB uffer:  functio n (t) { 
             r eturn L t(t)
         } ,
         isPr imitive : on,
          isFunct ion: Re ,
         isEr ror: Fe ,
         isDa te: Be, 
         isObj ect: zt ,
         isRe gExp: S e,
         isU ndefine d: Ct,
          isSymb ol: fun ction ( t) {
              retu rn type of t ==  "symbo l"
         },
          isStri ng: ie, 
         isNum ber: Pi ,
         isNu llOrUnd efined:  functi on (t)  {
              return  t == nu ll
         },
          isNull : funct ion (t)  {
              return  t ===  null
         } ,
         isBo olean:  nn,
         is Array:  Li,
         in spect:  Rt,
         de precate : br,
          format:  Qr,
         d ebuglog : ki,
     }
     funct ion Bi( t, e) { 
         if (t  === e)  return  0
         for  (var r  = t.le ngth, n  = e.le ngth, i  = 0, s  = Math .min(r,  n); i  < s; ++ i)
              if (t[ i] !==  e[i]) { 
                  ;(r  = t[i]) , (n =  e[i])
                   break
              }
          return  r < n  ? -1 :  n < r ?  1 : 0
     }
     var  Zs = Ob ject.pr ototype .hasOwn Propert y,
         Fi  =
              Object. keys || 
             f unction  (t) {
                   var e  = [],
                       r 
                  for  (r in t ) Zs.ca ll(t, r ) && e. push(r) 
                  retu rn e
              },
          Ui = Ar ray.pro totype. slice,
          un
     functi on Di()  {
         ret urn typ eof un  < "u"
              ? u n
              : (un =  (funct ion ()  {
                    r eturn f unction  () {}. name == = "foo" 
                })())
     }
     func tion Mi (t) {
          return  Lt(t) | | typeo f te.Ar rayBuff er != " functio n" ? !1  : type of Arra yBuffer .isView  == "fu nction"  ? Arra yBuffer .isView (t) : t  ? !!(t  instan ceof Da taView  || (t.b uffer & & t.buf fer ins tanceof  ArrayB uffer))  : !1
     }
     funct ion V(t , e) {
          t || o t(t, !0 , e, "= =", hn) 
    }
     var  Qs = / \\s*func tion\\s+ ([^\\(\\s ]*)\\s*/ 
    fu nction  xi(t) { 
         if (R e(t)) r eturn D i() ? t .name :  (t = t .toStri ng().ma tch(Qs) ) && t[ 1]
     }
    V .Assert ionErro r = fn
     fun ction f n(t) {
          ;(this .name =  "Asser tionErr or"), ( this.ac tual =  t.actua l), (th is.expe cted =  t.expec ted), ( this.op erator  = t.ope rator),  t.mess age ? ( (this.m essage  = t.mes sage),  (this.g enerate dMessag e = !1) ) : ((t his.mes sage =  ji(Yi(t his.act ual), 1 28) + "  " + th is.oper ator +  " " + j i(Yi(th is.expe cted),  128)),  (this.g enerate dMessag e = !0) )
         var  e = t.s tackSta rtFunct ion ||  ot
         Err or.capt ureStac kTrace
              ?  Error.c aptureS tackTra ce(this , e)
              : (( t = Err or()),
                 t.stack  &&
                     ((t =  t.stack ),
                     (e = xi (e)),
                     (e =  t.inde xOf(
                         \` 
\` + e
                     )), 
                    0  <= e && 
                         ((e =  t.inde xOf(
                              \`
\`, 
                             e  + 1
                         ) ),
                         (t  = t.sub string( e + 1)) ),
                     (this.s tack =  t)))
     }
     Gt(fn,  Error) 
    fu nction  ji(t, e ) {
         re turn ty peof t  == "str ing" ?  (t.leng th < e  ? t : t .slice( 0, e))  : t
     }
     functio n Yi(t)  {
         ret urn Di( ) || !R e(t) ?  Rt(t) :  ((t =  xi(t)),  "[Func tion" +  (t ? " : " + t  : "")  + "]")
     }
     func tion ot (t, e,  r, n, i ) {
         th row new  fn({ m essage:  r, act ual: t,  expect ed: e,  operato r: n, s tackSta rtFunct ion: i  })
     }
    V .fail =  ot
     functi on hn(t , e) {
          t || o t(t, !0 , e, "= =", hn) 
    }
     ;(V .ok = h n), (V. equal =  \$i)
     funct ion \$i( t, e, r ) {
         t  != e &&  ot(t,  e, r, " ==", \$i )
    } 
    V. notEqua l = Wi
     fun ction W i(t, e,  r) {
          t == e  && ot(t , e, r,  "!=",  Wi)
     }
     V.deepE qual =  Gi
     functio n Gi(t,  e, r)  {
         Ae(t , e, !1 ) || ot (t, e,  r, "dee pEqual" , Gi)
     }
     V.dee pStrict Equal =  zi
     functi on zi(t , e, r)  {
         Ae( t, e, ! 0) || o t(t, e,  r, "de epStric tEqual" , zi)
     }
     funct ion Ae( t, e, r , n) {
          if (t  === e)  return  !0
         if  (Lt(t)  && Lt(e )) retu rn Bi(t , e) == = 0
         if  (Be(t)  && Be( e)) ret urn t.g etTime( ) === e .getTim e()
         if  (Se(t)  && Se( e)) ret urn t.s ource = == e.so urce &&  t.glob al ===  e.globa l && t. multili ne ===  e.multi line &&  t.last Index = == e.la stIndex  && t.i gnoreCa se ===  e.ignor eCase
          if ((t  !== nul l && ty peof t  == "obj ect") | | (e != = null  && type of e ==  "objec t")) {
              if  (!Mi(t ) || !M i(e) ||  Object .protot ype.toS tring.c all(t)  !== Obj ect.pro totype. toStrin g.call( e) || t  instan ceof Fl oat32Ar ray ||  t insta nceof F loat64A rray) { 
                  if ( Lt(t) ! == Lt(e )) retu rn !1
                   n = n  || { ac tual: [ ], expe cted: [ ] }
                  v ar i =  n.actua l.index Of(t)
                   return  i !==  -1 && i  === n. expecte d.index Of(e) ?  !0 : ( n.actua l.push( t), n.e xpected .push(e ), bs(t , e, r,  n))
              }
              retu rn Bi(n ew Uint 8Array( t.buffe r), new  Uint8A rray(e. buffer) ) === 0 
         }
         re turn r  ? t ===  e : t  == e
     }
     functi on Vi(t ) {
         re turn Ob ject.pr ototype .toStri ng.call (t) ==  "[objec t Argum ents]"
     }
     func tion bs (t, e,  r, n) { 
         if (t  == nul l || e  === nul l || e  === voi d 0) re turn !1 
         if (o n(t) ||  on(e))  return  t ===  e
         if ( r && Ob ject.ge tProtot ypeOf(t ) !== O bject.g etProto typeOf( e)) ret urn !1
          var i  = Vi(t) ,
              s = Vi( e)
         if  ((i &&  !s) ||  (!i &&  s)) ret urn !1
          if (i)  return  (t = U i.call( t)), (e  = Ui.c all(e)) , Ae(t,  e, r)
          i = Fi (t)
         va r u = F i(e)
         i f (i.le ngth != = u.len gth) re turn !1 
         for ( i.sort( ), u.so rt(), s  = i.le ngth -  1; 0 <=  s; s-- ) if (i [s] !==  u[s])  return  !1
         for  (s = i .length  - 1; 0  <= s;  s--) if  (((u =  i[s]),  !Ae(t[ u], e[u ], r, n ))) ret urn !1
          return  !0
     }
     V.notDe epEqual  = qi
     func tion qi (t, e,  r) {
         A e(t, e,  !1) &&  ot(t,  e, r, " notDeep Equal",  qi)
     }
     V.notD eepStri ctEqual  = Ki
     func tion Ki (t, e,  r) {
         A e(t, e,  !0) &&  ot(t,  e, r, " notDeep StrictE qual",  Ki)
     }
     V.stric tEqual  = Hi
     funct ion Hi( t, e, r ) {
         t  !== e & & ot(t,  e, r,  "===",  Hi)
     }
     V.notSt rictEqu al = Xi 
    fu nction  Xi(t, e , r) {
          t ===  e && ot (t, e,  r, "!== ", Xi)
     }
     func tion Ji (t, e)  {
         if ( !t || ! e) retu rn !1
          if (Obj ect.pro totype. toStrin g.call( e) == " [object  RegExp ]") ret urn e.t est(t)
          try {
              if  (t ins tanceof  e) ret urn !0
          } catc h {}
         r eturn E rror.is Prototy peOf(e)  ? !1 :  e.call ({}, t)  === !0 
    }
     fun ction Z i(t, e,  r, n)  {
         if ( typeof  e != "f unction ") thro w new T ypeErro r('"blo ck" arg ument m ust be  a funct ion')
          typeof  r == "s tring"  && ((n  = r), ( r = nul l))
         tr y {
              e()
          } catch  (l) {
              va r i = l 
         }
         ;( e = i),  (n = ( r && r. name ?  " (" +  r.name  + ")."  : ".")  + (n ?  " " + n  : ".") ), t &&  !e &&  ot(e, r , "Miss ing exp ected e xceptio n" + n) , (i =  typeof  n == "s tring") 
         var s  = !t & & Fe(e) ,
              u = !t  && e &&  !r
         if  ((((s  && i &&  Ji(e,  r)) ||  u) && o t(e, r,  "Got u nwanted  except ion" +  n), (t  && e &&  r && ! Ji(e, r )) || ( !t && e ))) thr ow e
     }
     V.thro ws = tu 
    fu nction  tu(t, e , r) {
          Zi(!0,  t, e,  r)
     }
    V .doesNo tThrow  = eu
     funct ion eu( t, e, r ) {
         Zi (!1, t,  e, r)
     }
     V.if Error =  ru
     functi on ru(t ) {
         if  (t) th row t
     }
     var D e = b(f unction  (t, e)  {
         fun ction r (p) {
              ret urn (fu nction  (a) {
                   functi on y(v)  {
                       for ( var w =  [], O  = 1; O  < argum ents.le ngth; O ++) w[O  - 1] =  argume nts[O]
                       r eturn ( w = a.c all(thi s, n(v,  w)) ||  this),  (w.cod e = v),  (w[l]  = v), ( w.name  = a.pro totype. name +  " [" +  w[l] +  "]"), w 
                  }
                   return  u(y, a) , y
              })(p) 
         }
         fu nction  n(p, a)  {
              V.stri ctEqual (typeof  p, "st ring")
              va r y = g [p]
              if (( V(y, "A n inval id erro r messa ge key  was use d: " +  p + "." ), type of y ==  "funct ion"))  p = y
              els e {
                  i f (((p  = Ue.fo rmat),  a === v oid 0 | | a.len gth ===  0)) re turn y
                   a.uns hift(y) 
             } 
             r eturn S tring(p .apply( null, a ))
         }
          functio n i(p,  a) {
              g[p]  = type of a ==  "funct ion" ?  a : Str ing(a)
          }
         fun ction s (p, a)  {
              if ((V( p, "exp ected i s requi red"),  V(typeo f a ==  "string ", "thi ng is r equired "), Arr ay.isAr ray(p)) ) {
                  v ar y =  p.lengt h
                  ret urn (
                       V( 0 < y,  "At lea st one  expecte d value  needs  to be s pecifie d"),
                       (p  = p.map (functi on (v)  {
                           re turn St ring(v) 
                       })),
                       2 <  y ? "o ne of "  + a +  " " + p .slice( 0, y -  1).join (", ")  + ", or  " + p[ y - 1]  : y ===  2 ? "o ne of "  + a +  " " + p [0] + "  or " +  p[1] :  "of "  + a + "  " + p[ 0]
                  )
              }
              re turn "o f " + a  + " "  + Strin g(p)
         } 
         var u  =
              (H &&  H.__ext ends) | |
              (functi on () { 
                  func tion p( a, y) { 
                       return  (
                           (p  =
                                Obje ct.setP rototyp eOf ||
                                 ({ __pr oto__:  [] } in stanceo f Array  &&
                                     functi on (v,  w) {
                                         v .__prot o__ = w 
                                    })  ||
                                fun ction ( v, w) { 
                                    fo r (var  O in w)  w.hasO wnPrope rty(O)  && (v[O ] = w[O ])
                                }),
                            p(a,  y)
                       )
                   }
                  ret urn fun ction ( a, y) { 
                       functio n v() { 
                           thi s.const ructor  = a
                       }
                       p(a , y), ( a.proto type =  y === n ull ? O bject.c reate(y ) : ((v .protot ype = y .protot ype), n ew v()) )
                  }
              })( )
         Obje ct.defi nePrope rty(e,  "__esMo dule",  { value : !0 }) 
         var l  = type of Symb ol > "u " ? "_k Code" :  Symbol ("code" ),
              g = {} 
         ;(t =  (funct ion (p)  {
              functi on a(y)  {
                  if  (typeo f y !=  "object " || y  === nul l) thro w new e .TypeEr ror("ER R_INVAL ID_ARG_ TYPE",  "option s", "ob ject")
                   var v  = y.me ssage ?  p.call (this,  y.messa ge) ||  this :  p.call( this, U e.inspe ct(y.ac tual).s lice(0,  128) +  " " +  (y.oper ator +  " " + U e.inspe ct(y.ex pected) .slice( 0, 128) )) || t his
                  r eturn ( v.gener atedMes sage =  !y.mess age), ( v.name  = "Asse rtionEr ror [ER R_ASSER TION]") , (v.co de = "E RR_ASSE RTION") , (v.ac tual =  y.actua l), (v. expecte d = y.e xpected ), (v.o perator  = y.op erator) , e.Err or.capt ureStac kTrace( v, y.st ackStar tFuncti on), v
              }
              re turn u( a, p),  a
         })(H .Error) ),
              (e.Ass ertionE rror =  t),
              (e.me ssage =  n),
              (e.E  = i),
              (e .Error  = r(H.E rror)), 
             ( e.TypeE rror =  r(H.Typ eError) ),
              (e.Ran geError  = r(H. RangeEr ror)),
              i( "ERR_AR G_NOT_I TERABLE ", "%s  must be  iterab le"),
              i(" ERR_ASS ERTION" , "%s") ,
              i("ERR_ BUFFER_ OUT_OF_ BOUNDS" , funct ion (p,  a) {
                   return  a ? "A ttempt  to writ e outsi de buff er boun ds" : ' "' + p  + '" is  outsid e of bu ffer bo unds'
              }), 
             i ("ERR_C HILD_CL OSED_BE FORE_RE PLY", " Child c losed b efore r eply re ceived" ),
              i("ERR _CONSOL E_WRITA BLE_STR EAM", " Console  expect s a wri table s tream i nstance  for %s "),
              i("ER R_CPU_U SAGE",  "Unable  to obt ain cpu  usage  %s"),
              i(" ERR_DNS _SET_SE RVERS_F AILED",  functi on (p,  a) {
                   return  'c-ares  failed  to set  server s: "' +  p + '"  [' + a  + "]"
              }) ,
              i("ERR_ FALSY_V ALUE_RE JECTION ", "Pro mise wa s rejec ted wit h falsy  value" ),
              i("ERR _ENCODI NG_NOT_ SUPPORT ED", fu nction  (p) {
                   return  'The " ' + p +  '" enc oding i s not s upporte d'
              }),
              i("E RR_ENCO DING_IN VALID_E NCODED_ DATA",  functio n (p) { 
                  retu rn "The  encode d data  was not  valid  for enc oding "  + p
              }),
              i( "ERR_HT TP_HEAD ERS_SEN T", "Ca nnot re nder he aders a fter th ey are  sent to  the cl ient"), 
             i ("ERR_H TTP_INV ALID_ST ATUS_CO DE", "I nvalid  status  code: % s"),
              i("E RR_HTTP _TRAILE R_INVAL ID", "T railers  are in valid w ith thi s trans fer enc oding") ,
              i("ERR_ INDEX_O UT_OF_R ANGE",  "Index  out of  range") ,
              i("ERR_ INVALID _ARG_TY PE", fu nction  (p, a,  y) {
                   if ((V( p, "nam e is re quired" ), a.in cludes( "not ") )) {
                       var  v = "m ust not  be"
                       a =  a.spli t("not  ")[1]
                   } else  v = "m ust be" 
                  if ( Array.i sArray( p))
                       v =
                            "The  " +
                            p
                                .map (functi on (O)  {
                                    r eturn ' "' + O  + '"'
                                } )
                                .join (", ")  +
                           "  argumen ts " +
                            v +
                            " "  +
                           s( a, "typ e")
                  e lse if  (p.incl udes("  argumen t")) v  = "The  " + p +  " " +  v + " "  + s(a,  "type" )
                  els e {
                       var  w = p.i ncludes (".") ?  "prope rty" :  "argume nt"
                       v =  'The "'  + p +  '" ' +  w + " "  + v +  " " + s (a, "ty pe")
                   }
                  ret urn 3 < = argum ents.le ngth &&  (v +=  ". Rece ived ty pe " +  (y !==  null ?  typeof  y : "nu ll")),  v
              }),
              i("ER R_INVAL ID_ARRA Y_LENGT H", fun ction ( p, a, y ) {
                  r eturn V .strict Equal(t ypeof y , "numb er"), ' The arr ay "' +  p + '"  (lengt h ' + y  + ") m ust be  of leng th " +  a + "." 
             } ),
              i("ERR _INVALI D_BUFFE R_SIZE" , "Buff er size  must b e a mul tiple o f %s"), 
             i ("ERR_I NVALID_ CALLBAC K", "Ca llback  must be  a func tion"), 
             i ("ERR_I NVALID_ CHAR",  "Invali d chara cter in  %s"),
              i( "ERR_IN VALID_C URSOR_P OS", "C annot s et curs or row  without  settin g its c olumn") ,
              i("ERR_ INVALID _FD", ' "fd" mu st be a  positi ve inte ger: %s '),
              i("ER R_INVAL ID_FILE _URL_HO ST", 'F ile URL  host m ust be  "localh ost" or  empty  on %s') ,
              i("ERR_ INVALID _FILE_U RL_PATH ", "Fil e URL p ath %s" ),
              i("ERR _INVALI D_HANDL E_TYPE" , "This  handle  type c annot b e sent" ),
              i("ERR _INVALI D_IP_AD DRESS",  "Inval id IP a ddress:  %s"),
              i( "ERR_IN VALID_O PT_VALU E", fun ction ( p, a) { 
                  retu rn 'The  value  "' + St ring(a)  + '" i s inval id for  option  "' + p  + '"'
              }), 
             i ("ERR_I NVALID_ OPT_VAL UE_ENCO DING",  functio n (p) { 
                  retu rn 'The  value  "' + St ring(p)  + '" i s inval id for  option  "encodi ng"'
              }),
              i( "ERR_IN VALID_R EPL_EVA L_CONFI G", 'Ca nnot sp ecify b oth "br eakEval OnSigin t" and  "eval"  for REP L'),
              i("E RR_INVA LID_SYN C_FORK_ INPUT",  "Async hronous  forks  do not  support  Buffer , Uint8 Array o r strin g input : %s"), 
             i ("ERR_I NVALID_ THIS",  'Value  of "thi s" must  be of  type %s '),
              i("ER R_INVAL ID_TUPL E", "%s  must b e an it erable  %s tupl e"),
              i("E RR_INVA LID_URL ", "Inv alid UR L: %s") ,
              i("ERR_ INVALID _URL_SC HEME",  functio n (p) { 
                  retu rn "The  URL mu st be "  + s(p,  "schem e")
              }),
              i(" ERR_IPC _CHANNE L_CLOSE D", "Ch annel c losed") ,
              i("ERR_ IPC_DIS CONNECT ED", "I PC chan nel is  already  discon nected" ),
              i("ERR _IPC_ON E_PIPE" , "Chil d proce ss can  have on ly one  IPC pip e"),
              i("E RR_IPC_ SYNC_FO RK", "I PC cann ot be u sed wit h synch ronous  forks") ,
              i("ERR_ MISSING _ARGS",  functi on () { 
                  for  (var p  = [], a  = 0; a  < argu ments.l ength;  a++) p[ a] = ar guments [a]
                  V (0 < p. length,  "At le ast one  arg ne eds to  be spec ified") , (a =  "The ") 
                  var  y = p.l ength
                   switch  (
                       ((p =  p.map( functio n (v) { 
                           ret urn '"'  + v +  '"'
                       })), 
                       y)
                  )  {
                       case 1 :
                           a  += p[0]  + " ar gument" 
                           bre ak
                       case  2:
                           a  += p[0 ] + " a nd " +  p[1] +  " argum ents"
                            break 
                       default :
                           ;( a += p. slice(0 , y - 1 ).join( ", ")),  (a +=  ", and  " + p[y  - 1] +  " argu ments") 
                  }
                   return  a + " m ust be  specifi ed"
              }),
              i(" ERR_MUL TIPLE_C ALLBACK ", "Cal lback c alled m ultiple  times" ),
              i("ERR _NAPI_C ONS_FUN CTION",  "Const ructor  must be  a func tion"), 
             i ("ERR_N API_CON S_PROTO TYPE_OB JECT",  "Constr uctor.p rototyp e must  be an o bject") ,
              i("ERR_ NO_CRYP TO", "N ode.js  is not  compile d with  OpenSSL  crypto  suppor t"),
              i("E RR_NO_L ONGER_S UPPORTE D", "%s  is no  longer  support ed"),
              i(" ERR_PAR SE_HIST ORY_DAT A", "Co uld not  parse  history  data i n %s"), 
             i ("ERR_S OCKET_A LREADY_ BOUND",  "Socke t is al ready b ound"), 
             i ("ERR_S OCKET_B AD_PORT ", "Por t shoul d be >  0 and <  65536" ),
              i("ERR _SOCKET _BAD_TY PE", "B ad sock et type  specif ied. Va lid typ es are:  udp4,  udp6"), 
             i ("ERR_S OCKET_C ANNOT_S END", " Unable  to send  data") ,
              i("ERR_ SOCKET_ CLOSED" , "Sock et is c losed") ,
              i("ERR_ SOCKET_ DGRAM_N OT_RUNN ING", " Not run ning"), 
             i ("ERR_S TDERR_C LOSE",  "proces s.stder r canno t be cl osed"), 
             i ("ERR_S TDOUT_C LOSE",  "proces s.stdou t canno t be cl osed"), 
             i ("ERR_S TREAM_W RAP", " Stream  has Str ingDeco der set  or is  in obje ctMode" ),
              i("ERR _TLS_CE RT_ALTN AME_INV ALID",  "Hostna me/IP d oes not  match  certifi cate's  altname s: %s") ,
              i("ERR_ TLS_DH_ PARAM_S IZE", f unction  (p) {
                   retur n "DH p aramete r size  " + p +  " is l ess tha n 2048" 
             } ),
              i("ERR _TLS_HA NDSHAKE _TIMEOU T", "TL S hands hake ti meout") ,
              i("ERR_ TLS_REN EGOTIAT ION_FAI LED", " Failed  to rene gotiate "),
              i("ER R_TLS_R EQUIRED _SERVER _NAME",  '"serv ername"  is req uired p aramete r for S erver.a ddConte xt'),
              i(" ERR_TLS _SESSIO N_ATTAC K", "TS L sessi on rene gotiati on atta ck dete cted"), 
             i ("ERR_T RANSFOR M_ALREA DY_TRAN SFORMIN G", "Ca lling t ransfor m done  when st ill tra nsformi ng"),
              i(" ERR_TRA NSFORM_ WITH_LE NGTH_0" , "Call ing tra nsform  done wh en writ ableSta te.leng th != 0 "),
              i("ER R_UNKNO WN_ENCO DING",  "Unknow n encod ing: %s "),
              i("ER R_UNKNO WN_SIGN AL", "U nknown  signal:  %s"),
              i( "ERR_UN KNOWN_S TDIN_TY PE", "U nknown  stdin f ile typ e"),
              i("E RR_UNKN OWN_STR EAM_TYP E", "Un known s tream f ile typ e"),
              i("E RR_V8BR EAKITER ATOR",  "Full I CU data  not in stalled . See h ttps:// github. com/nod ejs/nod e/wiki/ Intl")
     })
     et( De)
     var pt  = b(fu nction  (t, e)  {
         Obje ct.defi nePrope rty(e,  "__esMo dule",  { value : !0 }) ,
              (e.ENCO DING_UT F8 = "u tf8"),
              (e .assert Encodin g = fun ction ( r) {
                   if (r & & !G.Bu ffer.is Encodin g(r)) t hrow ne w De.Ty peError ("ERR_I NVALID_ OPT_VAL UE_ENCO DING",  r)
              }),
              (e.s trToEnc oding =  functi on (r,  n) {
                   return  n && n  !== e.E NCODING _UTF8 ?  (n ===  "buffe r" ? ne w G.Buf fer(r)  : new G .Buffer (r).toS tring(n )) : r
              }) 
    }) 
    et (pt)
     var l n = b(f unction  (t, e)  {
         Obj ect.def ineProp erty(e,  "__esM odule",  { valu e: !0 } )
         var  r = F.c onstant s.S_IFM T,
              n = F. constan ts.S_IF DIR,
              i =  F.const ants.S_ IFREG,
              s  = F.con stants. S_IFBLK ,
              u = F.c onstant s.S_IFC HR,
              l = F .consta nts.S_I FLNK,
              g =  F.cons tants.S _IFIFO, 
             p  = F.co nstants .S_IFSO CK
         ;(t  = (fun ction ( ) {
              funct ion a()  {
                  ;( this.na me = "" ), (thi s.mode  = 0)
              }
              retu rn (
                   (a.buil d = fun ction ( y, v) { 
                       var w =  new a( ),
                           O  = y.ge tNode() .mode
                       re turn (w .name =  pt.str ToEncod ing(y.g etName( ), v)),  (w.mod e = O),  w
                  }) ,
                  (a. prototy pe._che ckModeP roperty  = func tion (y ) {
                       retu rn (thi s.mode  & r) == = y
                  } ),
                  (a .protot ype.isD irector y = fun ction ( ) {
                       retu rn this ._check ModePro perty(n )
                  }), 
                  (a.p rototyp e.isFil e = fun ction ( ) {
                       retu rn this ._check ModePro perty(i )
                  }), 
                  (a.p rototyp e.isBlo ckDevic e = fun ction ( ) {
                       retu rn this ._check ModePro perty(s )
                  }), 
                  (a.p rototyp e.isCha racterD evice =  functi on () { 
                       return  this._c heckMod eProper ty(u)
                   }),
                   (a.prot otype.i sSymbol icLink  = funct ion ()  {
                       return  this._ checkMo dePrope rty(l)
                   }),
                   (a.pro totype. isFIFO  = funct ion ()  {
                       return  this._ checkMo dePrope rty(g)
                   }),
                   (a.pro totype. isSocke t = fun ction ( ) {
                       retu rn this ._check ModePro perty(p )
                  }), 
                  a
              )
         } )()),
              (e. Dirent  = t),
              (e. default  = t)
     })
     et(l n)
     functio n Qi(t,  e) {
          for (va r r = 0 , n = t .length  - 1; 0  <= n;  n--) {
              va r i = t [n]
              i ===  "." ?  t.splic e(n, 1)  : i == = ".."  ? (t.sp lice(n,  1), r+ +) : r  && (t.s plice(n , 1), r --)
         }
          if (e)  for (;  r--; r ) t.uns hift(". .")
         re turn t
     }
     var  cn = /^ (\\/?|)( [\\s\\S]* ?)((?:\\ .{1,2}| [^\\/]+? |)(\\.[^ .\\/]*|) )(?:[\\/ ]*)\$/
     func tion pn () {
         f or (var  t = "" , e = ! 1, r =  argumen ts.leng th - 1;  -1 <=  r && !e ; r--)  {
              var n =  0 <= r  ? argu ments[r ] : "/" 
             i f (type of n !=  "strin g") thr ow new  TypeErr or("Arg uments  to path .resolv e must  be stri ngs")
              n & & ((t =  n + "/ " + t),  (e = n .charAt (0) ===  "/"))
          }
         ret urn (
              (t  = Qi(
                   gn(t.s plit("/ "), fun ction ( i) {
                       ret urn !!i 
                  }),
                   !e
              ).jo in("/") ),
              (e ? " /" : "" ) + t | | "."
          )
    } 
    fu nction  bi(t) { 
         var e  = to(t ),
              r = nu (t, -1)  === "/ "
         retu rn (
              (t =  Qi(
                   gn(t.sp lit("/" ), func tion (n ) {
                       retu rn !!n
                   }),
                   !e
              ).joi n("/"))  ||
                  e  ||
                  ( t = "." ),
              t && r  && (t  += "/") ,
              (e ? "/ " : "")  + t
         ) 
    }
     fun ction t o(t) {
          return  t.char At(0) = == "/"
     }
     func tion an (t, e)  {
         func tion r( u) {
              for  (var l  = 0; l  < u.len gth &&  u[l] == = ""; l ++);
              for  (var g  = u.len gth - 1 ; 0 <=  g && u[ g] ===  ""; g-- );
              return  l > g  ? [] :  u.slice (l, g -  l + 1) 
         }
         ;( t = pn( t).subs tr(1)),  (e = p n(e).su bstr(1) ), (t =  r(t.sp lit("/" ))), (e  = r(e. split(" /")))
          for (va r n = M ath.min (t.leng th, e.l ength),  i = n,  s = 0;  s < n;  s++)
              if  (t[s] ! == e[s] ) {
                  i  = s
                   break
              }
          for (n  = [], s  = i; s  < t.le ngth; s ++) n.p ush(".. ")
         ret urn (n  = n.con cat(e.s lice(i) )), n.j oin("/" )
    } 
    va r yn =  {
         extn ame: fu nction  (t) {
              ret urn cn. exec(t) .slice( 1)[3]
          },
         bas ename:  functio n (t, e ) {
              retur n (t =  cn.exec (t).sli ce(1)[2 ]), e & & t.sub str(-1  * e.len gth) == = e &&  (t = t. substr( 0, t.le ngth -  e.lengt h)), t
          },
         di rname:  functio n (t) { 
             v ar e =  cn.exec (t).sli ce(1)
              ret urn (t  = e[0]) , (e =  e[1]),  !t && ! e ? "."  : (e & & (e =  e.subst r(0, e. length  - 1)),  t + e)
          },
         se p: "/", 
         delim iter: " :",
         re lative:  an,
         j oin: fu nction  () {
              var  t = Arr ay.prot otype.s lice.ca ll(argu ments,  0)
              return  bi(
                   gn(t, f unction  (e) {
                       i f (type of e !=  "strin g") thr ow new  TypeErr or("Arg uments  to path .join m ust be  strings ")
                       retur n e
                  } ).join( "/")
              )
         } ,
         isAb solute:  to,
         n ormaliz e: bi,
          resolv e: pn,
     }
     func tion gn (t, e)  {
         if ( t.filte r) retu rn t.fi lter(e) 
         for ( var r =  [], n  = 0; n  < t.len gth; n+ +) e(t[ n], n,  t) && r .push(t [n])
         r eturn r 
    }
     var  nu =
              "ab ".subst r(-1) = == "b"
                   ? fun ction ( t, e, r ) {
                         re turn t. substr( e, r)
                     }
                   : funct ion (t,  e, r)  {
                         retu rn 0 >  e && (e  = t.le ngth +  e), t.s ubstr(e , r)
                     },
         O e = b(f unction  (t, e)  {
              Object .define Propert y(e, "_ _esModu le", {  value:  !0 }),  (t = ty peof se tImmedi ate ==  "functi on" ? s etImmed iate.bi nd(H) :  setTim eout.bi nd(H)),  (e.def ault =  t)
         })
     et( Oe)
     var st  = b(fu nction  (t, e)  {
         func tion r( ) {
              var n  = _e | | {}
              retu rn (
                   n.getui d ||
                       (n. getuid  = funct ion ()  {
                           re turn 0
                       } ),
                  n. getgid  ||
                       (n.ge tgid =  functio n () {
                            retu rn 0
                       }), 
                  n.cw d ||
                       (n. cwd = f unction  () {
                            retur n "/"
                       }) ,
                  n.n extTick  || (n. nextTic k = Oe. default ),
                  n. emitWar ning || 
                       (n.emit Warning  = func tion (i , s) {
                            cons ole.war n("" +  s + (s  ? ": "  : "") +  i)
                       }),
                   n.env  || (n. env = { }),
                  n 
             ) 
         }
         Ob ject.de finePro perty(e , "__es Module" , { val ue: !0  }), (e. createP rocess  = r), ( e.defau lt = r( ))
     })
     et(st)
     fun ction V t() {}
     Vt. prototy pe = Ob ject.cr eate(nu ll)
     functi on U()  {
         U.in it.call (this)
     }
     ;(U. EventEm itter =  U),
         ( U.using Domains  = !1), 
         (U.pr ototype .domain  = void  0),
         ( U.proto type._e vents =  void 0 ),
         (U. prototy pe._max Listene rs = vo id 0),
          (U.def aultMax Listene rs = 10 ),
         (U. init =  functio n () {
              ;( this.do main =  null),  (this._ events  && this ._event s !== O bject.g etProto typeOf( this)._ events)  || ((t his._ev ents =  new Vt( )), (th is._eve ntsCoun t = 0)) , (this ._maxLi steners  = this ._maxLi steners  || voi d 0)
         } ),
         (U. prototy pe.setM axListe ners =  functio n (t) { 
             i f (type of t !=  "numbe r" || 0  > t ||  isNaN( t)) thr ow new  TypeErr or('"n"  argume nt must  be a p ositive  number ')
              return  (this. _maxLis teners  = t), t his
         }) ,
         (U.p rototyp e.getMa xListen ers = f unction  () {
              ret urn thi s._maxL istener s === v oid 0 ?  U.defa ultMaxL istener s : thi s._maxL istener s
         }),
          (U.pro totype. emit =  functio n (t) { 
             v ar e,
                   r,
                  n  = t == = "erro r"
              if ((e  = this ._event s)) n =  n && e .error  == null 
             e lse if  (!n) re turn !1 
             v ar i =  this.do main
              if ( n) {
                   if (((e  = argu ments[1 ]), i))  e || ( e = Err or('Unc aught,  unspeci fied "e rror" e vent')) , (e.do mainEmi tter =  this),  (e.doma in = i) , (e.do mainThr own = ! 1), i.e mit("er ror", e )
                  els e throw  e inst anceof  Error ?  e : (( i = Err or('Unc aught,  unspeci fied "e rror" e vent. ( ' + e +  ")")),  (i.con text =  e), i)
                   retur n !1
              }
              if ( ((i = e [t]), ! i)) ret urn !1
              e  = typeo f i ==  "functi on"
              var s  = argu ments.l ength
              swi tch (s)  {
                  ca se 1:
                       if  (e) i. call(th is)
                       else  for (e  = i.le ngth, i  = Me(i , e), n  = 0; n  < e; + +n) i[n ].call( this)
                       br eak
                  c ase 2:
                       i f (((n  = argum ents[1] ), e))  i.call( this, n )
                       else f or (e =  i.leng th, i =  Me(i,  e), s =  0; s <  e; ++s ) i[s]. call(th is, n)
                       b reak
                   case 3: 
                       if (((n  = argu ments[1 ]), (s  = argum ents[2] ), e))  i.call( this, n , s)
                       els e for ( e = i.l ength,  i = Me( i, e),  r = 0;  r < e;  ++r) i[ r].call (this,  n, s)
                       br eak
                  c ase 4:
                       i f (((n  = argum ents[1] ), (s =  argume nts[2]) , (r =  argumen ts[3]),  e)) i. call(th is, n,  s, r)
                       el se {
                            ;(e =  i.lengt h), (i  = Me(i,  e))
                            for (v ar u =  0; u <  e; ++u)  i[u].c all(thi s, n, s , r)
                       }
                       br eak
                  d efault: 
                       for (n  = Array (s - 1) , r = 1 ; r < s ; r++)  n[r - 1 ] = arg uments[ r]
                       if (e ) i.app ly(this , n)
                       els e for ( e = i.l ength,  i = Me( i, e),  s = 0;  s < e;  ++s) i[ s].appl y(this,  n)
              }
              retur n !0
         } )
    f unction  eo(t,  e, r, n ) {
         va r i
         if  (typeo f r !=  "functi on") th row new  TypeEr ror('"l istener " argum ent mus t be a  functio n')
         if  ((i =  t._even ts)) {
              i. newList ener &&  (t.emi t("newL istener ", e, r .listen er ? r. listene r : r),  (i = t ._event s))
              var s  = i[e] 
         } els e (i =  t._even ts = ne w Vt()) , (t._e ventsCo unt = 0 )
         retu rn s ?  (typeof  s == " functio n" ? (s  = i[e]  = n ?  [r, s]  : [s, r ]) : n  ? s.uns hift(r)  : s.pu sh(r),  s.warne d || (( r = t._ maxList eners = == void  0 ? U. default MaxList eners :  t._max Listene rs) &&  0 < r & & s.len gth > r  && ((s .warned  = !0),  (r = E rror("P ossible  EventE mitter  memory  leak de tected.  " + s. length  + " " +  e + "  listene rs adde d. Use  emitter .setMax Listene rs() to  increa se limi t")), ( r.name  = "MaxL istener sExceed edWarni ng"), ( r.emitt er = t) , (r.ty pe = e) , (r.co unt = s .length ), type of cons ole.war n == "f unction " ? con sole.wa rn(r) :  consol e.log(r )))) :  ((i[e]  = r), + +t._eve ntsCoun t), t
     }
     ;(U.p rototyp e.addLi stener  = funct ion (t,  e) {
          return  eo(this , t, e,  !1)
     }),
          (U.prot otype.o n = U.p rototyp e.addLi stener) ,
         (U.p rototyp e.prepe ndListe ner = f unction  (t, e)  {
              return  eo(thi s, t, e , !0)
          })
     functio n ro(t,  e, r)  {
         func tion n( ) {
              t.rem oveList ener(e,  n), i  || ((i  = !0),  r.apply (t, arg uments) )
         }
         v ar i =  !1
         ret urn (n. listene r = r),  n
     }
    ; (U.prot otype.o nce = f unction  (t, e)  {
         if  (typeof  e != " functio n") thr ow new  TypeErr or('"li stener"  argume nt must  be a f unction ')
         ret urn thi s.on(t,  ro(thi s, t, e )), thi s
    } ),
         (U. prototy pe.prep endOnce Listene r = fun ction ( t, e) { 
             i f (type of e !=  "funct ion") t hrow ne w TypeE rror('" listene r" argu ment mu st be a  functi on')
              retu rn this .prepen dListen er(t, r o(this,  t, e)) , this
          }),
         ( U.proto type.re moveLis tener =  functi on (t,  e) {
              var  r
              if (typ eof e ! = "func tion")  throw n ew Type Error(' "listen er" arg ument m ust be  a funct ion')
              var  n = th is._eve nts
              if (! n) retu rn this 
             v ar i =  n[t]
              if ( !i) ret urn thi s
              if (i = == e ||  (i.lis tener & & i.lis tener = == e))  --this. _events Count = == 0 ?  (this._ events  = new V t()) :  (delete  n[t],  n.remov eListen er && t his.emi t("remo veListe ner", t , i.lis tener | | e))
              els e if (t ypeof i  != "fu nction" ) {
                  v ar s =  -1
                  fo r (r =  i.lengt h; 0 <  r--; )
                       i f (i[r]  === e  || (i[r ].liste ner &&  i[r].li stener  === e))  {
                           v ar u =  i[r].li stener
                            s =  r
                           br eak
                       }
                   if (0 >  s) ret urn thi s
                  if  (i.leng th ===  1) {
                       if  (((i[0]  = void  0), -- this._e ventsCo unt ===  0)) re turn (t his._ev ents =  new Vt( )), thi s
                       delete  n[t]
                   } else  {
                       r = s  + 1
                       for  (var l  = i.le ngth; r  < l; s  += 1,  r += 1)  i[s] =  i[r]
                       i. pop()
                   }
                  n. removeL istener  && thi s.emit( "remove Listene r", t,  u || e) 
             } 
             r eturn t his
         }) ,
         (U.p rototyp e.remov eAllLis teners  = funct ion (t)  {
              var e  = this. _events 
             i f (!e)  return  this
              if ( !e.remo veListe ner) re turn ar guments .length  === 0  ? ((thi s._even ts = ne w Vt()) , (this ._event sCount  = 0)) :  e[t] & & (--th is._eve ntsCoun t === 0  ? (thi s._even ts = ne w Vt())  : dele te e[t] ), this 
             i f (argu ments.l ength = == 0) { 
                  e =  Object. keys(e) 
                  for  (var r  = 0, n;  r < e. length;  ++r) ( n = e[r ]), n ! == "rem oveList ener" & & this. removeA llListe ners(n) 
                  retu rn this .remove AllList eners(" removeL istener "), (th is._eve nts = n ew Vt() ), (thi s._even tsCount  = 0),  this
              }
              if ( ((e = e [t]), t ypeof e  == "fu nction" )) this .remove Listene r(t, e) 
             e lse if  (e)
                  d o this. removeL istener (t, e[e .length  - 1])
                   while  (e[0]) 
             r eturn t his
         }) ,
         (U.p rototyp e.liste ners =  functio n (t) { 
             v ar e =  this._e vents
              if  (e)
                  i f ((t =  e[t])) 
                       if (typ eof t = = "func tion")  t = [t. listene r || t] 
                       else {
                            e =  Array(t .length )
                           fo r (var  r = 0;  r < e.l ength;  ++r) e[ r] = t[ r].list ener ||  t[r]
                            t = e 
                       }
                  els e t = [ ]
              else t  = []
              retu rn t
         } ),
         (U. listene rCount  = funct ion (t,  e) {
              ret urn typ eof t.l istener Count = = "func tion" ?  t.list enerCou nt(e) :  no.cal l(t, e) 
         }),
          (U.prot otype.l istener Count =  no)
     funct ion no( t) {
         v ar e =  this._e vents
          if (e)  {
              if (((t  = e[t] ), type of t ==  "funct ion"))  return  1
              if (t)  return  t.lengt h
         }
         r eturn 0 
    }
     U.p rototyp e.event Names =  functi on () { 
         retur n 0 < t his._ev entsCou nt ? Re flect.o wnKeys( this._e vents)  : []
     }
     functi on Me(t , e) {
          for (v ar r =  Array(e ); e--;  ) r[e]  = t[e] 
         retur n r
     }
     var xe  = b(fun ction ( t, e) { 
         var r  =
              (H &&  H.__ext ends) | |
              (functi on () { 
                  func tion g( p, a) { 
                       return  (
                           (g  =
                                Obje ct.setP rototyp eOf ||
                                 ({ __pr oto__:  [] } in stanceo f Array  &&
                                     functi on (y,  v) {
                                         y .__prot o__ = v 
                                    })  ||
                                fun ction ( y, v) { 
                                    fo r (var  w in v)  v.hasO wnPrope rty(w)  && (y[w ] = v[w ])
                                }),
                            g(p,  a)
                       )
                   }
                  ret urn fun ction ( p, a) { 
                       functio n y() { 
                           thi s.const ructor  = p
                       }
                       g(p , a), ( p.proto type =  a === n ull ? O bject.c reate(a ) : ((y .protot ype = a .protot ype), n ew y()) )
                  }
              })( )
         Obje ct.defi nePrope rty(e,  "__esMo dule",  { value : !0 }) 
         var n  = F.co nstants .S_IFMT ,
              i = F.c onstant s.S_IFD IR,
              s = F .consta nts.S_I FREG,
              u =  F.cons tants.S _IFLNK, 
             l  = F.co nstants .O_APPE ND
         ;(e .SEP =  "/"),
              (t  = (func tion (g ) {
                  f unction  p(a, y ) {
                       y == = void  0 && (y  = 438) 
                       var v =  g.call (this)  || this 
                       return  (v.uid  = st.de fault.g etuid() ), (v.g id = st .defaul t.getgi d()), ( v.atime  = new  Date()) , (v.mt ime = n ew Date ()), (v .ctime  = new D ate()),  (v.per m = 438 ), (v.m ode = s ), (v.n link =  1), (v. perm =  y), (v. mode |=  y), (v .ino =  a), v
                   }
                  re turn (
                       r (p, g), 
                       (p.prot otype.g etStrin g = fun ction ( a) {
                            return  a ===  void 0  && (a =  "utf8" ), this .getBuf fer().t oString (a)
                       }),
                       ( p.proto type.se tString  = func tion (a ) {
                            ;(this. buf = G .buffer From(a,  "utf8" )), thi s.touch ()
                       }),
                       (p .protot ype.get Buffer  = funct ion ()  {
                           re turn th is.buf  || this .setBuf fer(G.b ufferAl locUnsa fe(0)),  G.buff erFrom( this.bu f)
                       }),
                       (p .protot ype.set Buffer  = funct ion (a)  {
                           ; (this.b uf = G. bufferF rom(a)) , this. touch() 
                       }),
                       (p.p rototyp e.getSi ze = fu nction  () {
                            return  this.b uf ? th is.buf. length  : 0
                       }),
                       ( p.proto type.se tModePr operty  = funct ion (a)  {
                           t his.mod e = (th is.mode  & ~n)  | a
                       }),
                       ( p.proto type.se tIsFile  = func tion ()  {
                           t his.set ModePro perty(s )
                       }),
                       (p. prototy pe.setI sDirect ory = f unction  () {
                            this. setMode Propert y(i)
                       }), 
                       (p.prot otype.s etIsSym link =  functio n () {
                            this .setMod eProper ty(u)
                       }) ,
                       (p.pro totype. isFile  = funct ion ()  {
                           re turn (t his.mod e & n)  === s
                       }) ,
                       (p.pro totype. isDirec tory =  functio n () {
                            retu rn (thi s.mode  & n) == = i
                       }),
                       ( p.proto type.is Symlink  = func tion ()  {
                           r eturn ( this.mo de & n)  === u
                       } ),
                       (p.pr ototype .makeSy mlink =  functi on (a)  {
                           ;( this.sy mlink =  a), th is.setI sSymlin k()
                       }),
                       ( p.proto type.wr ite = f unction  (a, y,  v, w)  {
                           if  ((y == = void  0 && (y  = 0),  v === v oid 0 & & (v =  a.lengt h), w = == void  0 && ( w = 0),  this.b uf || ( this.bu f = G.b ufferAl locUnsa fe(0)),  w + v  > this. buf.len gth)) { 
                                var O  = G.buf ferAllo cUnsafe (w + v) 
                                this.b uf.copy (O, 0,  0, this .buf.le ngth),  (this.b uf = O) 
                           }
                            retur n a.cop y(this. buf, w,  y, y +  v), th is.touc h(), v
                       } ),
                       (p.pr ototype .read =  functi on (a,  y, v, w ) {
                            return  y === v oid 0 & & (y =  0), v = == void  0 && ( v = a.b yteLeng th), w  === voi d 0 &&  (w = 0) , this. buf ||  (this.b uf = G. bufferA llocUns afe(0)) , v > a .byteLe ngth &&  (v = a .byteLe ngth),  v + w >  this.b uf.leng th && ( v = thi s.buf.l ength -  w), th is.buf. copy(a,  y, w,  w + v),  v
                       }),
                       (p .protot ype.tru ncate =  functi on (a)  {
                           if  ((a == = void  0 && (a  = 0),  a))
                                if  ((this. buf ||  (this.b uf = G. bufferA llocUns afe(0)) , a <=  this.bu f.lengt h)) thi s.buf =  this.b uf.slic e(0, a) 
                                else { 
                                    va r y = G .buffer AllocUn safe(0) 
                                    th is.buf. copy(y) , y.fil l(0, a) 
                                }
                           e lse thi s.buf =  G.buff erAlloc Unsafe( 0)
                           t his.tou ch()
                       }), 
                       (p.prot otype.c hmod =  functio n (a) { 
                           ;(t his.per m = a),  (this. mode =  (this.m ode & - 512) |  a), thi s.touch ()
                       }),
                       (p .protot ype.cho wn = fu nction  (a, y)  {
                           ;( this.ui d = a),  (this. gid = y ), this .touch( )
                       }),
                       (p. prototy pe.touc h = fun ction ( ) {
                            ;(this. mtime =  new Da te()),  this.em it("cha nge", t his)
                       }), 
                       (p.prot otype.c anRead  = funct ion (a,  y) {
                            retur n a ===  void 0  && (a  = st.de fault.g etuid() ), y == = void  0 && (y  = st.d efault. getgid( )), !!( this.pe rm & 4  || (y = == this .gid &&  this.p erm & 3 2) || ( a === t his.uid  && thi s.perm  & 256)) 
                       }),
                       (p.p rototyp e.canWr ite = f unction  (a, y)  {
                           r eturn a  === vo id 0 &&  (a = s t.defau lt.getu id()),  y === v oid 0 & & (y =  st.defa ult.get gid()),  !!(thi s.perm  & 2 ||  (y ===  this.gi d && th is.perm  & 16)  || (a = == this .uid &&  this.p erm & 1 28))
                       }), 
                       (p.prot otype.d el = fu nction  () {
                            this.e mit("de lete",  this)
                       }) ,
                       (p.pro totype. toJSON  = funct ion ()  {
                           re turn {  ino: th is.ino,  uid: t his.uid , gid:  this.gi d, atim e: this .atime. getTime (), mti me: thi s.mtime .getTim e(), ct ime: th is.ctim e.getTi me(), p erm: th is.perm , mode:  this.m ode, nl ink: th is.nlin k, syml ink: th is.syml ink, da ta: thi s.getSt ring()  }
                       }),
                       p
                   )
              })(U.E ventEmi tter)), 
             ( e.Node  = t),
              (t  = (func tion (g ) {
                  f unction  p(a, y , v) {
                       v ar w =  g.call( this) | | this
                       r eturn ( w.child ren = { }), (w. steps =  []), ( w.ino =  0), (w .length  = 0),  (w.vol  = a), ( w.paren t = y),  (w.ste ps = y  ? y.ste ps.conc at([v])  : [v]) , w
                  } 
                  retu rn (
                       r(p , g),
                       (p .protot ype.set Node =  functio n (a) { 
                           ;(t his.nod e = a),  (this. ino = a .ino)
                       }) ,
                       (p.pro totype. getNode  = func tion ()  {
                           r eturn t his.nod e
                       }),
                       (p. prototy pe.crea teChild  = func tion (a , y) {
                            y == = void  0 && (y  = this .vol.cr eateNod e())
                            var v  = new p (this.v ol, thi s, a)
                            retur n v.set Node(y) , y.isD irector y(), th is.setC hild(a,  v), v
                       } ),
                       (p.pr ototype .setChi ld = fu nction  (a, y)  {
                           re turn y  === voi d 0 &&  (y = ne w p(thi s.vol,  this, a )), (th is.chil dren[a]  = y),  (y.pare nt = th is), th is.leng th++, t his.emi t("chil d:add",  y, thi s), y
                       }) ,
                       (p.pro totype. deleteC hild =  functio n (a) { 
                           del ete thi s.child ren[a.g etName( )], thi s.lengt h--, th is.emit ("child :delete ", a, t his)
                       }), 
                       (p.prot otype.g etChild  = func tion (a ) {
                            if (Obj ect.has OwnProp erty.ca ll(this .childr en, a))  return  this.c hildren [a]
                       }),
                       ( p.proto type.ge tPath =  functi on () { 
                           ret urn thi s.steps .join(e .SEP)
                       }) ,
                       (p.pro totype. getName  = func tion ()  {
                           r eturn t his.ste ps[this .steps. length  - 1]
                       }), 
                       (p.prot otype.w alk = f unction  (a, y,  v) {
                            if (( y === v oid 0 & & (y =  a.lengt h), v = == void  0 && ( v = 0),  v >= a .length  || v > = y)) r eturn t his
                            var w =  this.g etChild (a[v])
                            retu rn w ?  w.walk( a, y, v  + 1) :  null
                       }) ,
                       (p.pro totype. toJSON  = funct ion ()  {
                           re turn {  steps:  this.st eps, in o: this .ino, c hildren : Objec t.keys( this.ch ildren)  }
                       }),
                       p
                   )
              })(U. EventEm itter)) ,
              (e.Link  = t),
              (t  = (fun ction ( ) {
                  f unction  g(p, a , y, v)  {
                       ;(thi s.posit ion = 0 ), (thi s.link  = p), ( this.no de = a) , (this .flags  = y), ( this.fd  = v)
                   }
                  re turn (
                       ( g.proto type.ge tString  = func tion ()  {
                           r eturn t his.nod e.getSt ring()
                       } ),
                       (g.pr ototype .setStr ing = f unction  (p) {
                            this .node.s etStrin g(p)
                       }), 
                       (g.prot otype.g etBuffe r = fun ction ( ) {
                            return  this.no de.getB uffer() 
                       }),
                       (g.p rototyp e.setBu ffer =  functio n (p) { 
                           thi s.node. setBuff er(p)
                       }) ,
                       (g.pro totype. getSize  = func tion ()  {
                           r eturn t his.nod e.getSi ze()
                       }), 
                       (g.prot otype.t runcate  = func tion (p ) {
                            this.no de.trun cate(p) 
                       }),
                       (g.p rototyp e.seekT o = fun ction ( p) {
                            this.p osition  = p
                       }), 
                       (g.prot otype.s tats =  functio n () {
                            retu rn ve.d efault. build(t his.nod e)
                       }),
                       (g .protot ype.wri te = fu nction  (p, a,  y, v) { 
                           ret urn a = == void  0 && ( a = 0),  y ===  void 0  && (y =  p.leng th), ty peof v  != "num ber" &&  (v = t his.pos ition),  this.f lags &  l && (v  = this .getSiz e()), ( p = thi s.node. write(p , a, y,  v)), ( this.po sition  = v + p ), p
                       }), 
                       (g.prot otype.r ead = f unction  (p, a,  y, v)  {
                           re turn a  === voi d 0 &&  (a = 0) , y ===  void 0  && (y  = p.byt eLength ), type of v !=  "numbe r" && ( v = thi s.posit ion), ( p = thi s.node. read(p,  a, y,  v)), (t his.pos ition =  v + p) , p
                       }),
                       ( g.proto type.ch mod = f unction  (p) {
                            this .node.c hmod(p) 
                       }),
                       (g.p rototyp e.chown  = func tion (p , a) {
                            this .node.c hown(p,  a)
                       }),
                       g 
                  )
              })() ),
              (e.Fil e = t)
     })
     et( xe)
     var iu  = xe.N ode,
         i o = b(f unction  (t, e)  {
              Object .define Propert y(e, "_ _esModu le", {  value:  !0 }),
                   (e.de fault =  functi on (r,  n, i) { 
                       var s =  setTim eout.ap ply(nul l, argu ments)
                       r eturn s  && typ eof s = = "obje ct" &&  typeof  s.unref  == "fu nction"  && s.u nref(),  s
                  }) 
         })
     et(io )
    f unction  oe() { 
         ;(thi s.tail  = this. head =  null),  (this.l ength =  0)
     }
     ;(oe.pr ototype .push =  functi on (t)  {
         ;(t  = { dat a: t, n ext: nu ll }),  0 < thi s.lengt h ? (th is.tail .next =  t) : ( this.he ad = t) , (this .tail =  t), ++ this.le ngth
     }),
          (oe.pro totype. unshift  = func tion (t ) {
              ;(t =  { data : t, ne xt: thi s.head  }), thi s.lengt h === 0  && (th is.tail  = t),  (this.h ead = t ), ++th is.leng th
         }), 
         (oe.p rototyp e.shift  = func tion ()  {
              if (th is.leng th !==  0) {
                   var t =  this.h ead.dat a
                  ret urn (th is.head  = this .length  === 1  ? (this .tail =  null)  : this. head.ne xt), -- this.le ngth, t 
             } 
         }),
          (oe.pro totype. clear =  functi on () { 
             ; (this.h ead = t his.tai l = nul l), (th is.leng th = 0) 
         }),
          (oe.pro totype. join =  functio n (t) { 
             i f (this .length  === 0)  return  ""
              for ( var e =  this.h ead, r  = "" +  e.data;  (e = e .next);  ) r +=  t + e. data
              retu rn r
         } ),
         (oe .protot ype.con cat = f unction  (t) {
              if  (this. length  === 0)  return  S.alloc (0)
              if (t his.len gth ===  1) ret urn thi s.head. data
              t =  S.alloc Unsafe( t >>> 0 )
              for (va r e = t his.hea d, r =  0; e; )  e.data .copy(t , r), ( r += e. data.le ngth),  (e = e. next)
              ret urn t
          })
     var ou  =
         S.is Encodin g ||
         f unction  (t) {
              sw itch (t  && t.t oLowerC ase())  {
                  cas e "hex" :
                  cas e "utf8 ":
                  ca se "utf -8":
                   case "a scii":
                   case  "binary ":
                  ca se "bas e64":
                   case " ucs2":
                   case  "ucs-2" :
                  cas e "utf1 6le":
                   case " utf-16l e":
                  c ase "ra w":
                       retu rn !0
                   defaul t:
                       retur n !1
              }
         } 
    fu nction  je(t) { 
         if (( (this.e ncoding  = (t | | "utf8 ").toLo werCase ().repl ace(/[- _]/, "" )), t & & !ou(t ))) thr ow Erro r("Unkn own enc oding:  " + t)
          switch  (this. encodin g) {
              case  "utf8" :
                  thi s.surro gateSiz e = 3
                   break
              ca se "ucs 2":
              case  "utf16l e":
                  ; (this.s urrogat eSize =  2), (t his.det ectInco mpleteC har = u u)
                  br eak
              case  "base64 ":
                  ;( this.su rrogate Size =  3), (th is.dete ctIncom pleteCh ar = fu )
                  bre ak
              defaul t:
                  th is.writ e = su
                   retur n
         }
         ; (this.c harBuff er = ne w S(6)) , (this .charLe ngth =  this.ch arRecei ved = 0 )
    } 
    ;( je.prot otype.w rite =  functio n (t) { 
         for ( var e =  ""; th is.char Length;  ) {
              if ( ((e = t .length  >= thi s.charL ength -  this.c harRece ived ?  this.ch arLengt h - thi s.charR eceived  : t.le ngth),  t.copy( this.ch arBuffe r, this .charRe ceived,  0, e),  (this. charRec eived + = e), t his.cha rReceiv ed < th is.char Length) ) retur n ""
              ;(t  = t.sli ce(e, t .length )), (e  = this. charBuf fer.sli ce(0, t his.cha rLength ).toStr ing(thi s.encod ing))
              var  r = e. charCod eAt(e.l ength -  1)
              if (5 5296 <=  r && 5 6319 >=  r) (th is.char Length  += this .surrog ateSize ), (e =  "")
              else  {
                  if  (((thi s.charR eceived  = this .charLe ngth =  0), t.l ength = == 0))  return  e
                  bre ak
              }
         }
          this.de tectInc omplete Char(t) 
         var n  = t.le ngth
         r eturn t his.cha rLength  && (t. copy(th is.char Buffer,  0, t.l ength -  this.c harRece ived, n ), (n - = this. charRec eived)) , (e +=  t.toSt ring(th is.enco ding, 0 , n)),  (n = e. length  - 1), ( r = e.c harCode At(n)),  55296  <= r &&  56319  >= r ?  ((r = t his.sur rogateS ize), ( this.ch arLengt h += r) , (this .charRe ceived  += r),  this.ch arBuffe r.copy( this.ch arBuffe r, r, 0 , r), t .copy(t his.cha rBuffer , 0, 0,  r), e. substri ng(0, n )) : e
     }), 
         (je.p rototyp e.detec tIncomp leteCha r = fun ction ( t) {
              for  (var e  = 3 <=  t.lengt h ? 3 :  t.leng th; 0 <  e; e-- ) {
                  v ar r =  t[t.len gth - e ]
                  if  (e == 1  && r > > 5 ==  6) {
                       thi s.charL ength =  2
                       break 
                  }
                   if (2 > = e &&  r >> 4  == 14)  {
                       this.c harLeng th = 3
                       b reak
                   }
                  if  (3 >= e  && r > > 3 ==  30) {
                       th is.char Length  = 4
                       brea k
                  }
              }
              thi s.charR eceived  = e
         } ),
         (je .protot ype.end  = func tion (t ) {
              var e  = ""
              ret urn t & & t.len gth &&  (e = th is.writ e(t)),  this.ch arRecei ved &&  ((t = t his.enc oding),  (e +=  this.ch arBuffe r.slice (0, thi s.charR eceived ).toStr ing(t)) ), e
         } )
    f unction  su(t)  {
         retu rn t.to String( this.en coding) 
    }
     fun ction u u(t) {
          this.c harLeng th = (t his.cha rReceiv ed = t. length  % 2) ?  2 : 0
     }
     funct ion fu( t) {
         t his.cha rLength  = (thi s.charR eceived  = t.le ngth %  3) ? 3  : 0
     }
     q.Reada bleStat e = oo
     var  j = ki ("strea m")
     Gt(q,  U)
     functio n hu(t,  e, r)  {
         if ( typeof  t.prepe ndListe ner ==  "functi on") re turn t. prepend Listene r(e, r) 
         t._ev ents &&  t._eve nts[e]  ? (Arra y.isArr ay(t._e vents[e ]) ? t. _events [e].uns hift(r)  : (t._ events[ e] = [r , t._ev ents[e] ])) : t .on(e,  r)
     }
    f unction  oo(t,  e) {
         ; (t = t  || {}),  (this. objectM ode = ! !t.obje ctMode) , e ins tanceof  at &&  (this.o bjectMo de = th is.obje ctMode  || !!t. readabl eObject Mode),  (e = t. highWat erMark) 
         var r  = this .object Mode ?  16 : 16 384
         ;( this.hi ghWater Mark =  e || e  === 0 ?  e : r) , (this .highWa terMark  = ~~th is.high WaterMa rk), (t his.buf fer = n ew oe() ), (thi s.lengt h = 0),  (this. pipes =  null),  (this. pipesCo unt = 0 ), (thi s.flowi ng = nu ll), (t his.rea ding =  this.en dEmitte d = thi s.ended  = !1),  (this. sync =  !0), (t his.res umeSche duled =  this.r eadable Listeni ng = th is.emit tedRead able =  this.ne edReada ble = ! 1), (th is.defa ultEnco ding =  t.defau ltEncod ing ||  "utf8") , (this .ranOut  = !1),  (this. awaitDr ain = 0 ), (thi s.readi ngMore  = !1),  (this.e ncoding  = this .decode r = nul l), t.e ncoding  && ((t his.dec oder =  new je( t.encod ing)),  (this.e ncoding  = t.en coding) )
    } 
    fu nction  q(t) {
          if (!( this in stanceo f q)) r eturn n ew q(t) 
         ;(thi s._read ableSta te = ne w oo(t,  this)) , (this .readab le = !0 ), t &&  typeof  t.read  == "fu nction"  && (th is._rea d = t.r ead), U .call(t his)
     }
     ;(q.pr ototype .push =  functi on (t,  e) {
         v ar r =  this._r eadable State
          return  r.objec tMode | | typeo f t !=  "string " || (( e = e | | r.def aultEnc oding),  e !==  r.encod ing &&  ((t = S .from(t , e)),  (e = "" ))), so (this,  r, t, e , !1)
     }),
          (q.pro totype. unshift  = func tion (t ) {
              retur n so(th is, thi s._read ableSta te, t,  "", !0) 
         }),
          (q.prot otype.i sPaused  = func tion ()  {
              return  this._ readabl eState. flowing  === !1 
         })
     funct ion so( t, e, r , n, i)  {
         var  s = r, 
             u  = null 
         if (( Lt(s) | | typeo f s ==  "string " || s  === nul l || s  === voi d 0 ||  e.objec tMode | | (u =  new Typ eError( "Invali d non-s tring/b uffer c hunk")) , (s =  u))) t. emit("e rror",  s)
         els e if (r  === nu ll) (e. reading  = !1),  e.ende d || (e .decode r && (r  = e.de coder.e nd()) & & r.len gth &&  (e.buff er.push (r), (e .length  += e.o bjectMo de ? 1  : r.len gth)),  (e.ende d = !0) , vr(t) )
         else  if (e. objectM ode ||  (r && 0  < r.le ngth))
              if  (e.end ed && ! i) t.em it("err or", Er ror("st ream.pu sh() af ter EOF "))
              else  if (e.e ndEmitt ed && i ) t.emi t("erro r", Err or("str eam.uns hift()  after e nd even t"))
              else  {
                  if  (e.dec oder &&  !i &&  !n) {
                       r  = e.dec oder.wr ite(r)
                       v ar l =  !e.obje ctMode  && r.le ngth == = 0
                  } 
                  i ||  (e.rea ding =  !1), l  || (e.f lowing  && e.le ngth == = 0 &&  !e.sync  ? (t.e mit("da ta", r) , t.rea d(0)) :  ((e.le ngth +=  e.obje ctMode  ? 1 : r .length ), i ?  e.buffe r.unshi ft(r) :  e.buff er.push (r), e. needRea dable & & vr(t) )), e.r eadingM ore ||  ((e.rea dingMor e = !0) , ut(lu , t, e) )
              }
         else  i || ( e.readi ng = !1 )
         retu rn !e.e nded &&  (e.nee dReadab le || e .length  < e.hi ghWater Mark ||  e.leng th ===  0)
     }
    q .protot ype.set Encodin g = fun ction ( t) {
         r eturn ( this._r eadable State.d ecoder  = new j e(t)),  (this._ readabl eState. encodin g = t),  this
     }
     funct ion uo( t, e) { 
         if (0  >= t | | (e.le ngth == = 0 &&  e.ended )) retu rn 0
         i f (e.ob jectMod e) retu rn 1
         i f (t != = t) re turn e. flowing  && e.l ength ?  e.buff er.head .data.l ength :  e.leng th
         if  (t > e. highWat erMark)  {
              var r  = t
              83886 08 <= r  ? (r =  838860 8) : (r --, (r  |= r >> > 1), ( r |= r  >>> 2),  (r |=  r >>> 4 ), (r | = r >>>  8), (r  |= r > >> 16),  r++),  (e.high WaterMa rk = r) 
         }
         re turn t  <= e.le ngth ?  t : e.e nded ?  e.lengt h : ((e .needRe adable  = !0),  0)
     }
    q .protot ype.rea d = fun ction ( t) {
         j ("read" , t), ( t = par seInt(t , 10))
          var e  = this. _readab leState ,
              r = t
          if ((t  !== 0 & & (e.em ittedRe adable  = !1),  t === 0  && e.n eedRead able &&  (e.len gth >=  e.highW aterMar k || e. ended)) ) retur n j("re ad: emi tReadab le", e. length,  e.ende d), e.l ength = == 0 &&  e.ende d ? mn( this) :  vr(thi s), nul l
         if ( ((t = u o(t, e) ), t == = 0 &&  e.ended )) retu rn e.le ngth == = 0 &&  mn(this ), null 
         var n  = e.ne edReada ble
         re turn j( "need r eadable ", n),  (e.leng th ===  0 || e. length  - t < e .highWa terMark ) && (( n = !0) , j("le ngth le ss than  waterm ark", n )), e.e nded ||  e.read ing ? j ("readi ng or e nded",  !1) : n  && (j( "do rea d"), (e .readin g = !0) , (e.sy nc = !0 ), e.le ngth == = 0 &&  (e.need Readabl e = !0) , this. _read(e .highWa terMark ), (e.s ync = ! 1), e.r eading  || (t =  uo(r,  e))), ( n = 0 <  t ? ho (t, e)  : null) , n ===  null ?  ((e.ne edReada ble = ! 0), (t  = 0)) :  (e.len gth -=  t), e.l ength = == 0 &&  (e.end ed || ( e.needR eadable  = !0),  r !==  t && e. ended & & mn(th is)), n  !== nu ll && t his.emi t("data ", n),  n
    } 
    fu nction  vr(t) { 
         var e  = t._r eadable State
          ;(e.nee dReadab le = !1 ), e.em ittedRe adable  || (j(" emitRea dable",  e.flow ing), ( e.emitt edReada ble = ! 0), e.s ync ? u t(fo, t ) : fo( t))
     }
     functio n fo(t)  {
         j(" emit re adable" ), t.em it("rea dable") , dn(t) 
    }
     fun ction l u(t, e)  {
         for  (var r  = e.le ngth; ! e.readi ng && ! e.flowi ng && ! e.ended  && e.l ength <  e.high WaterMa rk && ( j("mayb eReadMo re read  0"), t .read(0 ), r != = e.len gth); )  r = e. length
          e.read ingMore  = !1
     }
     ;(q.p rototyp e._read  = func tion ()  {
         thi s.emit( "error" , Error ("not i mplemen ted"))
     }), 
         (q.pr ototype .pipe =  functi on (t,  e) {
              func tion r( \$) {
                   j("onun pipe"),  \$ ===  a && i( )
              }
              functio n n() { 
                  j("o nend"),  t.end( )
              }
              functio n i() { 
                  j("c leanup" ), t.re moveLis tener(" close",  l), t. removeL istener ("finis h", g),  t.remo veListe ner("dr ain", v ), t.re moveLis tener(" error",  u), t. removeL istener ("unpip e", r),  a.remo veListe ner("en d", n),  a.remo veListe ner("en d", i),  a.remo veListe ner("da ta", s) , (w =  !0), !y .awaitD rain ||  (t._wr itableS tate &&  !t._wr itableS tate.ne edDrain ) || v( )
              }
              functio n s(\$)  {
                  j(" ondata" ), (O =  !1), t .write( \$) !==  !1 || O  || ((( y.pipes Count = == 1 &&  y.pipe s === t ) || (1  < y.pi pesCoun t && lo (y.pipe s, t) ! == -1))  && !w  && (j(" false w rite re sponse,  pause" , a._re adableS tate.aw aitDrai n), a._ readabl eState. awaitDr ain++,  (O = !0 )), a.p ause()) 
             } 
             f unction  u(\$) { 
                  j("o nerror" , \$), p (), t.r emoveLi stener( "error" , u), t .listen ers("er ror").l ength = == 0 &&  t.emit ("error ", \$)
              }
              fun ction l () {
                   t.remov eListen er("fin ish", g ), p()
              }
              fu nction  g() {
                   j("onf inish") , t.rem oveList ener("c lose",  l), p() 
             } 
             f unction  p() {
                   j("un pipe"),  a.unpi pe(t)
              }
              var  a = th is,
                  y  = this ._reada bleStat e
              switch  (y.pipe sCount)  {
                  ca se 0:
                       y. pipes =  t
                       break 
                  case  1:
                       y.pi pes = [ y.pipes , t]
                       bre ak
                  de fault:
                       y .pipes. push(t) 
             } 
             ; (y.pipe sCount  += 1),  j("pipe  count= %d opts =%j", y .pipesC ount, e ), (e =  e && e .end == = !1 ?  i : n),  y.endE mitted  ? ut(e)  : a.on ce("end ", e),  t.on("u npipe",  r)
              var v  = cu(a )
              t.on("d rain",  v)
              var w  = !1,
                   O = !1 
             r eturn a .on("da ta", s) , hu(t,  "error ", u),  t.once( "close" , l), t .once(" finish" , g), t .emit(" pipe",  a), y.f lowing  || (j(" pipe re sume"),  a.resu me()),  t
         })
     func tion cu (t) {
          return  functio n () {
              va r e = t ._reada bleStat e
              j("pipe OnDrain ", e.aw aitDrai n), e.a waitDra in && e .awaitD rain--,  e.awai tDrain  === 0 & & t.lis teners( "data") .length  && ((e .flowin g = !0) , dn(t) )
         }
     }
     ;(q.pr ototype .unpipe  = func tion (t ) {
         va r e = t his._re adableS tate
         i f (e.pi pesCoun t === 0 ) retur n this
          if (e. pipesCo unt ===  1) ret urn t & & t !==  e.pipe s ? thi s : (t  || (t =  e.pipe s), (e. pipes =  null),  (e.pip esCount  = 0),  (e.flow ing = ! 1), t & & t.emi t("unpi pe", th is), th is)
         if  (!t) { 
             t  = e.pi pes
              var r  = e.pi pesCoun t
              for (e. pipes =  null,  e.pipes Count =  0, e.f lowing  = !1, e  = 0; e  < r; e ++) t[e ].emit( "unpipe ", this )
              return  this
         } 
         retur n (r =  lo(e.pi pes, t) ), r == = -1 ?  this :  (e.pipe s.splic e(r, 1) , --e.p ipesCou nt, e.p ipesCou nt ===  1 && (e .pipes  = e.pip es[0]),  t.emit ("unpip e", thi s), thi s)
     }),
         (q .protot ype.on  = funct ion (t,  e) {
              ret urn (e  = U.pro totype. on.call (this,  t, e)),  t ===  "data"  ? this. _readab leState .flowin g !== ! 1 && th is.resu me() :  t === " readabl e" && ( (t = th is._rea dableSt ate), t .endEmi tted ||  t.read ableLis tening  || ((t. readabl eListen ing = t .needRe adable  = !0),  (t.emit tedRead able =  !1), t. reading  ? t.le ngth &&  vr(thi s) : ut (pu, th is))),  e
         }),
          (q.pro totype. addList ener =  q.proto type.on )
    f unction  pu(t)  {
         j("r eadable  nextti ck read  0"), t .read(0 )
    } 
    q. prototy pe.resu me = fu nction  () {
         v ar t =  this._r eadable State
          return  t.flowi ng || ( j("resu me"), ( t.flowi ng = !0 ), t.re sumeSch eduled  || ((t. resumeS chedule d = !0) , ut(au , this,  t))),  this
     }
     functi on au(t , e) {
          e.read ing ||  (j("res ume rea d 0"),  t.read( 0)), (e .resume Schedul ed = !1 ), (e.a waitDra in = 0) , t.emi t("resu me"), d n(t), e .flowin g && !e .readin g && t. read(0) 
    }
     q.p rototyp e.pause  = func tion ()  {
         ret urn j(" call pa use flo wing=%j ", this ._reada bleStat e.flowi ng), th is._rea dableSt ate.flo wing != = !1 &&  (j("pa use"),  (this._ readabl eState. flowing  = !1),  this.e mit("pa use")),  this
     }
     funct ion dn( t) {
         v ar e =  t._read ableSta te
         for  (j("fl ow", e. flowing ); e.fl owing & & t.rea d() !==  null;  );
     }
    ; (q.prot otype.w rap = f unction  (t) {
          var e  = this. _readab leState ,
              r = !1, 
             n  = this 
         t.on( "end",  functio n () {
              if  ((j("w rapped  end"),  e.decod er && ! e.ended )) {
                   var s =  e.deco der.end ()
                  s  && s.le ngth &&  n.push (s)
              }
              n.pus h(null) 
         }),
              t.o n("data ", func tion (s ) {
                  j ("wrapp ed data "), e.d ecoder  && (s =  e.deco der.wri te(s)),  (e.obj ectMode  && s = = null)  || !(e .object Mode ||  (s &&  s.lengt h)) ||  n.push( s) || ( (r = !0 ), t.pa use())
              }) 
         for ( var i i n t)
              this [i] ===  void 0  &&
                  t ypeof t [i] ==  "functi on" &&
                   (this [i] = ( functio n (s) { 
                       return  functio n () {
                            retu rn t[s] .apply( t, argu ments)
                       } 
                  })(i ))
         ret urn (
              gu( ["error ", "clo se", "d estroy" , "paus e", "re sume"],  functi on (s)  {
                  t.o n(s, n. emit.bi nd(n, s ))
              }),
              (n._ read =  functio n (s) { 
                  j("w rapped  _read",  s), r  && ((r  = !1),  t.resum e())
              }),
              n
          )
     }),
         (q ._fromL ist = h o)
     functio n ho(t,  e) {
          if (e.l ength = == 0) r eturn n ull
         if  (e.obj ectMode ) var r  = e.bu ffer.sh ift()
          else if  (!t ||  t >= e .length ) (r =  e.decod er ? e. buffer. join("" ) : e.b uffer.l ength = == 1 ?  e.buffe r.head. data :  e.buffe r.conca t(e.len gth)),  e.buffe r.clear ()
         els e {
              if (( (r = e. buffer) , (e =  e.decod er), t  < r.hea d.data. length) ) (e =  r.head. data.sl ice(0,  t)), (r .head.d ata = r .head.d ata.sli ce(t))
              el se {
                   if (t = == r.he ad.data .length ) r = r .shift( )
                  els e if (e ) {
                       e =  r.head
                       v ar n =  1,
                           i  = e.da ta
                       for ( t -= i. length;  (e = e .next);  ) {
                            var s  = e.dat a,
                                u =  t > s.l ength ?  s.leng th : t
                            if ( ((i = u  === s. length  ? i + s  : i +  s.slice (0, t)) , (t -=  u), t  === 0))  {
                                u == = s.len gth ? ( ++n, (r .head =  e.next  ? e.ne xt : (r .tail =  null)) ) : ((r .head =  e), (e .data =  s.slic e(u)))
                                 break
                            }
                            ++n
                       }
                       ;(r .length  -= n),  (r = i )
                  } e lse {
                       fo r (e =  S.alloc Unsafe( t), n =  r.head , i = 1 , n.dat a.copy( e), t - = n.dat a.lengt h; (n =  n.next ); ) {
                            if ( ((s = n .data),  (u = t  > s.le ngth ?  s.lengt h : t),  s.copy (e, e.l ength -  t, 0,  u), (t  -= u),  t === 0 )) {
                                u  === s.l ength ?  (++i,  (r.head  = n.ne xt ? n. next :  (r.tail  = null ))) : ( (r.head  = n),  (n.data  = s.sl ice(u)) )
                                break 
                           }
                            ++i
                       }
                       ; (r.leng th -= i ), (r =  e)
                  } 
                  e =  r
              }
              r = e
          }
         retu rn r
     }
     functi on mn(t ) {
         va r e = t ._reada bleStat e
         if ( 0 < e.l ength)  throw E rror('" endRead able()"  called  on non -empty  stream' )
         e.en dEmitte d || (( e.ended  = !0),  ut(yu,  e, t)) 
    }
     fun ction y u(t, e)  {
         t.e ndEmitt ed || t .length  !== 0  || ((t. endEmit ted = ! 0), (e. readabl e = !1) , e.emi t("end" ))
     }
    f unction  gu(t,  e) {
         f or (var  r = 0,  n = t. length;  r < n;  r++) e (t[r],  r)
     }
    f unction  lo(t,  e) {
         f or (var  r = 0,  n = t. length;  r < n;  r++) i f (t[r]  === e)  return  r
         ret urn -1
     }
     ;(tt .Writab leState  = vn),  Gt(tt,  U)
     functi on du()  {}
     functi on mu(t , e, r)  {
         ;(t his.chu nk = t) , (this .encodi ng = e) , (this .callba ck = r) , (this .next =  null)
     }
     func tion vn (t, e)  {
         Obje ct.defi nePrope rty(thi s, "buf fer", { 
             g et: br( functio n () {
                   retur n this. getBuff er()
              }, " _writab leState .buffer  is dep recated . Use _ writabl eState. getBuff er inst ead."), 
         }),
              (t  = t ||  {}),
              (thi s.objec tMode =  !!t.ob jectMod e),
              e ins tanceof  at &&  (this.o bjectMo de = th is.obje ctMode  || !!t. writabl eObject Mode)
          var r =  t.high WaterMa rk,
              n = t his.obj ectMode  ? 16 :  16384
          ;(this .highWa terMark  = r ||  r ===  0 ? r :  n),
              (thi s.highW aterMar k = ~~t his.hig hWaterM ark),
              (th is.fini shed =  this.en ded = t his.end ing = t his.nee dDrain  = !1),
              (t his.dec odeStri ngs = t .decode Strings  !== !1 ),
              (this. default Encodin g = t.d efaultE ncoding  || "ut f8"),
              (th is.leng th = 0) ,
              (this.w riting  = !1),
              (t his.cor ked = 0 ),
              (this. sync =  !0),
              (thi s.buffe rProces sing =  !1),
              (thi s.onwri te = fu nction  (i) {
                   var s  = e._wr itableS tate,
                       u  = s.syn c,
                       l = s .writec b
                  ;(s .writin g = !1) , (s.wr itecb =  null),  (s.len gth -=  s.write len), ( s.write len = 0 ), i ?  (--s.pe ndingcb , u ? u t(l, i)  : l(i) , (e._w ritable State.e rrorEmi tted =  !0), e. emit("e rror",  i)) : ( (i = ao (s)) ||  s.cork ed || s .buffer Process ing ||  !s.buff eredReq uest ||  po(e,  s), u ?  ut(co,  e, s,  i, l) :  co(e,  s, i, l ))
              }),
              (thi s.write cb = nu ll),
              (thi s.write len = 0 ),
              (this. lastBuf feredRe quest =  this.b uffered Request  = null ),
              (this. pending cb = 0) ,
              (this.e rrorEmi tted =  this.pr efinish ed = !1 ),
              (this. buffere dReques tCount  = 0),
              (th is.cork edReque stsFree  = new  go(this ))
     }
    v n.proto type.ge tBuffer  = func tion ()  {
         for  (var t  = this .buffer edReque st, e =  []; t;  ) e.pu sh(t),  (t = t. next)
          return  e
    } 
    fu nction  tt(t) { 
         if (! (this i nstance of tt | | this  instanc eof at) ) retur n new t t(t)
         ; (this._ writabl eState  = new v n(t, th is)), ( this.wr itable  = !0),  t && (t ypeof t .write  == "fun ction"  && (thi s._writ e = t.w rite),  typeof  t.write v == "f unction " && (t his._wr itev =  t.write v)), U. call(th is)
     }
     ;(tt.pr ototype .pipe =  functi on () { 
         this. emit("e rror",  Error(" Cannot  pipe, n ot read able")) 
    }) ,
         (tt. prototy pe.writ e = fun ction ( t, e, r ) {
              var n  = this ._writa bleStat e,
                  i  = !1
              if ( (typeof  e == " functio n" && ( (r = e) , (e =  null)),  S.isBu ffer(t)  ? (e =  "buffe r") : e  || (e  = n.def aultEnc oding),  typeof  r != " functio n" && ( r = du) , n.end ed)) (n  = r),  (t = Er ror("wr ite aft er end" )), thi s.emit( "error" , t), u t(n, t) 
             e lse {
                   var s  = r,
                       u =  !0,
                       l =  !1
                  t  === nu ll ? (l  = new  TypeErr or("May  not wr ite nul l value s to st ream"))  : S.is Buffer( t) || t ypeof t  == "st ring" | | t ===  void 0  || n.o bjectMo de || ( l = new  TypeEr ror("In valid n on-stri ng/buff er chun k")), l  && (th is.emit ("error ", l),  ut(s, l ), (u =  !1)),  u && (n .pendin gcb++,  (i = e) , n.obj ectMode  || n.d ecodeSt rings = == !1 | | typeo f t !=  "string " || (t  = S.fr om(t, i )), S.i sBuffer (t) &&  (i = "b uffer") , (s =  n.objec tMode ?  1 : t. length) , (n.le ngth +=  s), (e  = n.le ngth <  n.highW aterMar k), e | | (n.ne edDrain  = !0),  n.writ ing ||  n.corke d ? ((s  = n.la stBuffe redRequ est), ( n.lastB uffered Request  = new  mu(t, i , r)),  s ? (s. next =  n.lastB uffered Request ) : (n. buffere dReques t = n.l astBuff eredReq uest),  (n.buff eredReq uestCou nt += 1 )) : wn (this,  n, !1,  s, t, i , r), ( i = e)) 
             } 
             r eturn i 
         }),
          (tt.pro totype. cork =  functio n () {
              th is._wri tableSt ate.cor ked++
          }),
         (t t.proto type.un cork =  functio n () {
              va r t = t his._wr itableS tate
              t.co rked &&  (t.cor ked--,  t.writi ng || t .corked  || t.f inished  || t.b ufferPr ocessin g || !t .buffer edReque st || p o(this,  t))
         } ),
         (tt .protot ype.set Default Encodin g = fun ction ( t) {
              if ( (typeof  t == " string"  && (t  = t.toL owerCas e()), ! (-1 < " hex utf 8 utf-8  ascii  binary  base64  ucs2 uc s-2 utf 16le ut f-16le  raw".sp lit(" " ).index Of((t +  "").to LowerCa se()))) ) throw  new Ty peError ("Unkno wn enco ding: "  + t)
              ret urn (th is._wri tableSt ate.def aultEnc oding =  t), th is
         })
     fun ction w n(t, e,  r, n,  i, s, u ) {
         ;( e.write len = n ), (e.w ritecb  = u), ( e.writi ng = !0 ), (e.s ync = ! 0), r ?  t._wri tev(i,  e.onwri te) : t ._write (i, s,  e.onwri te), (e .sync =  !1)
     }
     functi on co(t , e, r,  n) {
          !r && e .length  === 0  && e.ne edDrain  && ((e .needDr ain = ! 1), t.e mit("dr ain")),  e.pend ingcb-- , n(),  yo(t, e )
    } 
    fu nction  po(t, e ) {
         e. bufferP rocessi ng = !0 
         var r  = e.bu fferedR equest
          if (t. _writev  && r & & r.nex t) {
              var  n = Arr ay(e.bu fferedR equestC ount),
                   i = e .corked Request sFree
              i.e ntry =  r
              for (va r s = 0 ; r; )  (n[s] =  r), (r  = r.ne xt), (s  += 1)
              wn (t, e,  !0, e.l ength,  n, "",  i.finis h), e.p endingc b++, (e .lastBu fferedR equest  = null) , i.nex t ? ((e .corked Request sFree =  i.next ), (i.n ext = n ull)) :  (e.cor kedRequ estsFre e = new  go(e)) 
         } els e {
              for ( ; r &&  ((n = r .chunk) , wn(t,  e, !1,  e.obje ctMode  ? 1 : n .length , n, r. encodin g, r.ca llback) , (r =  r.next) , !e.wr iting);  );
              r ===  null & & (e.la stBuffe redRequ est = n ull)
         } 
         ;(e.b uffered Request Count =  0), (e .buffer edReque st = r) , (e.bu fferPro cessing  = !1)
     }
     ;(tt .protot ype._wr ite = f unction  (t, e,  r) {
          r(Error ("not i mplemen ted"))
     }), 
         (tt.p rototyp e._writ ev = nu ll),
         ( tt.prot otype.e nd = fu nction  (t, e,  r) {
              var  n = thi s._writ ableSta te
              typeof  t == " functio n" ? (( r = t),  (e = t  = null )) : ty peof e  == "fun ction"  && ((r  = e), ( e = nul l)), t  != null  && thi s.write (t, e),  n.cork ed && ( (n.cork ed = 1) , this. uncork( )), !n. ending  && !n.f inished  && ((t  = r),  (n.endi ng = !0 ), yo(t his, n) , t &&  (n.fini shed ?  ut(t) :  this.o nce("fi nish",  t)), (n .ended  = !0),  (this.w ritable  = !1)) 
         })
     funct ion ao( t) {
         r eturn t .ending  && t.l ength = == 0 &&  t.buff eredReq uest == = null  && !t.f inished  && !t. writing 
    }
     fun ction y o(t, e)  {
         var  r = ao (e)
         re turn r  && (e.p endingc b === 0  ? (e.p refinis hed ||  ((e.pre finishe d = !0) , t.emi t("pref inish") ), (e.f inished  = !0),  t.emit ("finis h")) :  e.prefi nished  || ((e. prefini shed =  !0), t. emit("p refinis h"))),  r
    } 
    fu nction  go(t) { 
         var e  = this 
         ;(thi s.entry  = this .next =  null), 
             ( this.fi nish =  functio n (r) { 
                  var  n = e.e ntry
                   for (e. entry =  null;  n; ) {
                       v ar i =  n.callb ack
                       t.pe ndingcb --, i(r ), (n =  n.next )
                  }
                   t.cork edReque stsFree  ? (t.c orkedRe questsF ree.nex t = e)  : (t.co rkedReq uestsFr ee = e) 
             } )
    } 
    Gt (at, q) 
    fo r (var  mo = Ob ject.ke ys(tt.p rototyp e), En  = 0; En  < mo.l ength;  En++) { 
         var _ n = mo[ En]
         at .protot ype[_n]  || (at .protot ype[_n]  = tt.p rototyp e[_n])
     }
     func tion at (t) {
          if (!(t his ins tanceof  at)) r eturn n ew at(t )
         q.ca ll(this , t), t t.call( this, t ), t &&  t.read able == = !1 &&  (this. readabl e = !1) , t &&  t.writa ble ===  !1 &&  (this.w ritable  = !1),  (this. allowHa lfOpen  = !0),  t && t. allowHa lfOpen  === !1  && (thi s.allow HalfOpe n = !1) , this. once("e nd", vu )
    } 
    fu nction  vu() {
          this.a llowHal fOpen | | this. _writab leState .ended  || ut(w u, this )
    } 
    fu nction  wu(t) { 
         t.end ()
     }
    G t(At, a t)
     functio n Eu(t)  {
         ;(t his.aft erTrans form =  functio n (e, r ) {
              var n  = t._t ransfor mState
              n. transfo rming =  !1
              var i  = n.wr itecb
              ret urn i ?  ((n.wr itechun k = nul l), (n. writecb  = null ), r !=  null & & t.pus h(r), i (e), (e  = t._r eadable State),  (e.rea ding =  !1), (e .needRe adable  || e.le ngth <  e.highW aterMar k) && t ._read( e.highW aterMar k), (e  = void  0)) : ( e = t.e mit("er ror", E rror("n o write cb in T ransfor m class "))), e 
         }),
              (th is.tran sformin g = thi s.needT ransfor m = !1) ,
              (this.w riteenc oding =  this.w ritechu nk = th is.writ ecb = n ull)
     }
     functi on At(t ) {
         if  (!(thi s insta nceof A t)) ret urn new  At(t)
          at.cal l(this,  t), (t his._tr ansform State =  new Eu (this)) 
         var e  = this 
         ;(thi s._read ableSta te.need Readabl e = !0) ,
              (this._ readabl eState. sync =  !1),
              t &&  (typeo f t.tra nsform  == "fun ction"  && (thi s._tran sform =  t.tran sform),  typeof  t.flus h == "f unction " && (t his._fl ush = t .flush) ),
              this.o nce("pr efinish ", func tion ()  {
                  ty peof th is._flu sh == " functio n"
                       ? thi s._flus h(funct ion (r)  {
                              vo(e,  r)
                         })
                       :  vo(e)
              }) 
    }
     ;(A t.proto type.pu sh = fu nction  (t, e)  {
         retu rn (thi s._tran sformSt ate.nee dTransf orm = ! 1), at. prototy pe.push .call(t his, t,  e)
     }),
         ( At.prot otype._ transfo rm = fu nction  () {
              thro w Error ("Not i mplemen ted")
          }),
         (A t.proto type._w rite =  functio n (t, e , r) {
              va r n = t his._tr ansform State
              ;(n .writec b = r),  (n.wri techunk  = t),  (n.writ eencodi ng = e) , n.tra nsformi ng || ( (t = th is._rea dableSt ate), ( n.needT ransfor m || t. needRea dable | | t.len gth < t .highWa terMark ) && th is._rea d(t.hig hWaterM ark))
          }),
         (A t.proto type._r ead = f unction  () {
              var  t = th is._tra nsformS tate
              t.wr itechun k !== n ull &&  t.write cb && ! t.trans forming  ? ((t. transfo rming =  !0), t his._tr ansform (t.writ echunk,  t.writ eencodi ng, t.a fterTra nsform) ) : (t. needTra nsform  = !0)
          })
     functio n vo(t,  e) {
          if (e)  return  t.emit( "error" , e)
         i f (((e  = t._tr ansform State),  t._wri tableSt ate.len gth)) t hrow Er ror("Ca lling t ransfor m done  when ws .length  != 0") 
         if (e .transf orming)  throw  Error(" Calling  transf orm don e when  still t ransfor ming")
          return  t.push (null)
     }
     Gt(Y e, At)
     fun ction Y e(t) {
          if (!( this in stanceo f Ye))  return  new Ye( t)
         At. call(th is, t)
     }
     ;(Ye .protot ype._tr ansform  = func tion (t , e, r)  {
         r(n ull, t) 
    }) ,
         Gt(f t, U),
          (ft.Re adable  = q),
          (ft.Wri table =  tt),
          (ft.Dup lex = a t),
         (f t.Trans form =  At),
         ( ft.Pass Through  = Ye), 
         (ft.S tream =  ft)
     funct ion ft( ) {
         U. call(th is)
     }
     ft.prot otype.p ipe = f unction  (t, e)  {
         fun ction r (a) {
              t.w ritable  && t.w rite(a)  === !1  && g.p ause &&  g.paus e()
         }
          functi on n()  {
              g.reada ble &&  g.resum e && g. resume( )
         }
         f unction  i() {
              p  || ((p  = !0),  t.end() )
         }
         f unction  s() {
              p  || ((p  = !0),  typeof  t.destr oy == " functio n" && t .destro y())
         } 
         funct ion u(a ) {
              if (( l(), U. listene rCount( this, " error")  === 0) ) throw  a
         }
          functio n l() { 
             g .remove Listene r("data ", r),  t.remov eListen er("dra in", n) , g.rem oveList ener("e nd", i) , g.rem oveList ener("c lose",  s), g.r emoveLi stener( "error" , u), t .remove Listene r("erro r", u),  g.remo veListe ner("en d", l),  g.remo veListe ner("cl ose", l ), t.re moveLis tener(" close",  l)
         }
          var g  = this
          g.on(" data",  r), t.o n("drai n", n),  t._isS tdio ||  (e &&  e.end = == !1)  || (g.o n("end" , i), g .on("cl ose", s ))
         var  p = !1 
         retur n g.on( "error" , u), t .on("er ror", u ), g.on ("end",  l), g. on("clo se", l) , t.on( "close" , l), t .emit(" pipe",  g), t
     }
     var _ u = Arr ay.prot otype.s lice,
          Su = {
              ex tend: f unction  t(e, r ) {
                  f or (var  n in r ) e[n]  = r[n]
                   retur n 3 > a rgument s.lengt h ? e :  t.appl y(null,  [e].co ncat(_u .call(a rgument s, 2))) 
             } ,
         },
          wo = b( functio n (t, e ) {
              funct ion r(s , u, l)  {
                  re turn (
                       l  === vo id 0 && 
                           (l  = funct ion (g)  {
                                retu rn g
                            }),
                       fun ction ( ) {
                            for (va r g = [ ], p =  0; p <  argumen ts.leng th; p++ ) g[p]  = argum ents[p] 
                           ret urn new  Promis e(funct ion (a,  y) {
                                s [u].bin d(s).ap ply(
                                     void  0,
                                     n(g, [
                                          functi on (v,  w) {
                                              retu rn v ?  y(v) :  a(l(w)) 
                                         },
                                     ])
                                )
                            })
                       }
                   )
              }
              var n  =
                  (H  && H._ _spread Arrays)  ||
                  f unction  () {
                       fo r (var  s = 0,  u = 0,  l = arg uments. length;  u < l;  u++) s  += arg uments[ u].leng th
                       s = A rray(s) 
                       var g =  0
                       for ( u = 0;  u < l;  u++) fo r (var  p = arg uments[ u], a =  0, y =  p.leng th; a <  y; a++ , g++)  s[g] =  p[a]
                       ret urn s
                   }
              Object .define Propert y(e, "_ _esModu le", {  value:  !0 })
              var  i = (f unction  () {
                   functi on s(u,  l) {
                       ;( this.vo l = u),  (this. fd = l) 
                  }
                   return  (
                       (s.pro totype. appendF ile = f unction  (u, l)  {
                           r eturn r (this.v ol, "ap pendFil e")(thi s.fd, u , l)
                       }), 
                       (s.prot otype.c hmod =  functio n (u) { 
                           ret urn r(t his.vol , "fchm od")(th is.fd,  u)
                       }),
                       (s .protot ype.cho wn = fu nction  (u, l)  {
                           re turn r( this.vo l, "fch own")(t his.fd,  u, l)
                       } ),
                       (s.pr ototype .close  = funct ion ()  {
                           re turn r( this.vo l, "clo se")(th is.fd)
                       } ),
                       (s.pr ototype .datasy nc = fu nction  () {
                            return  r(this .vol, " fdatasy nc")(th is.fd)
                       } ),
                       (s.pr ototype .read =  functi on (u,  l, g, p ) {
                            return  r(this. vol, "r ead", f unction  (a) {
                                 return  { bytes Read: a , buffe r: u }
                            })(t his.fd,  u, l,  g, p)
                       }) ,
                       (s.pro totype. readFil e = fun ction ( u) {
                            return  r(this .vol, " readFil e")(thi s.fd, u )
                       }),
                       (s. prototy pe.stat  = func tion (u ) {
                            return  r(this. vol, "f stat")( this.fd , u)
                       }), 
                       (s.prot otype.s ync = f unction  () {
                            retur n r(thi s.vol,  "fsync" )(this. fd)
                       }),
                       ( s.proto type.tr uncate  = funct ion (u)  {
                           r eturn r (this.v ol, "ft runcate ")(this .fd, u) 
                       }),
                       (s.p rototyp e.utime s = fun ction ( u, l) { 
                           ret urn r(t his.vol , "futi mes")(t his.fd,  u, l)
                       } ),
                       (s.pr ototype .write  = funct ion (u,  l, g,  p) {
                            return  r(this .vol, " write",  functi on (a)  {
                                retur n { byt esWritt en: a,  buffer:  u }
                            })(thi s.fd, u , l, g,  p)
                       }),
                       ( s.proto type.wr iteFile  = func tion (u , l) {
                            retu rn r(th is.vol,  "write File")( this.fd , u, l) 
                       }),
                       s
                   )
              })()
              ;(e. FileHan dle = i ),
                  (e .defaul t = fun ction ( s) {
                       ret urn typ eof Pro mise >  "u"
                            ? null
                            : {
                                   FileH andle:  i,
                                  ac cess: f unction  (u, l)  {
                                       retur n r(s,  "access ")(u, l )
                                  },
                                   appen dFile:  functio n (u, l , g) {
                                       r eturn r (s, "ap pendFil e")(u i nstance of i ?  u.fd :  u, l, g )
                                  },
                                   chmod : funct ion (u,  l) {
                                       re turn r( s, "chm od")(u,  l)
                                  } ,
                                  cho wn: fun ction ( u, l, g ) {
                                       retu rn r(s,  "chown ")(u, l , g)
                                   },
                                  co pyFile:  functi on (u,  l, g) { 
                                       return  r(s, "c opyFile ")(u, l , g)
                                   },
                                  lc hmod: f unction  (u, l)  {
                                       retur n r(s,  "lchmod ")(u, l )
                                  },
                                   lchow n: func tion (u , l, g)  {
                                       retur n r(s,  "lchown ")(u, l , g)
                                   },
                                  li nk: fun ction ( u, l) { 
                                       return  r(s, "l ink")(u , l)
                                   },
                                  ls tat: fu nction  (u, l)  {
                                       return  r(s, " lstat") (u, l)
                                   },
                                   mkdir:  functio n (u, l ) {
                                       retu rn r(s,  "mkdir ")(u, l )
                                  },
                                   mkdte mp: fun ction ( u, l) { 
                                       return  r(s, "m kdtemp" )(u, l) 
                                  },
                                   open:  functio n (u, l , g) {
                                       r eturn r (s, "op en", fu nction  (p) {
                                            retur n new i (s, p)
                                       } )(u, l,  g)
                                  } ,
                                  rea ddir: f unction  (u, l)  {
                                       retur n r(s,  "readdi r")(u,  l)
                                  }, 
                                  read File: f unction  (u, l)  {
                                       retur n r(s,  "readFi le")(u  instanc eof i ?  u.fd :  u, l)
                                   },
                                   readlin k: func tion (u , l) {
                                       r eturn r (s, "re adlink" )(u, l) 
                                  },
                                   realpa th: fun ction ( u, l) { 
                                       return  r(s, "r ealpath ")(u, l )
                                  },
                                   renam e: func tion (u , l) {
                                       r eturn r (s, "re name")( u, l)
                                   },
                                  r mdir: f unction  (u) {
                                       r eturn r (s, "rm dir")(u )
                                  },
                                   stat:  functi on (u,  l) {
                                       ret urn r(s , "stat ")(u, l )
                                  },
                                   symli nk: fun ction ( u, l, g ) {
                                       retu rn r(s,  "symli nk")(u,  l, g)
                                   },
                                   truncat e: func tion (u , l) {
                                       r eturn r (s, "tr uncate" )(u, l) 
                                  },
                                   unlink : funct ion (u)  {
                                       retur n r(s,  "unlink ")(u)
                                   },
                                  u times:  functio n (u, l , g) {
                                       r eturn r (s, "ut imes")( u, l, g )
                                  },
                                   write File: f unction  (u, l,  g) {
                                       re turn r( s, "wri teFile" )(u ins tanceof  i ? u. fd : u,  l, g)
                                   },
                              }
                   })
         })
     et( wo)
     var Ru  = /[^\\ x20-\\x7 E]/,
         A u = /[\\ x2E\\u30 02\\uFF0 E\\uFF61 ]/g,
         E o = { o verflow : "Over flow: i nput ne eds wid er inte gers to  proces s", "no t-basic ": "Ill egal in put >=  0x80 (n ot a ba sic cod e point )", "in valid-i nput":  "Invali d input " },
         T e = Mat h.floor ,
         Sn =  String .fromCh arCode
     fun ction O u(t, e)  {
         var  r = t. split(" @"),
              n =  ""
         1 <  r.leng th && ( (n = r[ 0] + "@ "), (t  = r[1]) ), (t =  t.repl ace(Au,  ".")),  (t = t .split( ".")),  (r = t. length) 
         for ( var i =  []; r- -; ) i[ r] = e( t[r])
          return  (e = i. join(". ")), n  + e
     }
     functio n _o(t,  e) {
          return  t + 22  + 75 *  (26 > t ) - ((e  != 0)  << 5)
     }
     funct ion Tu( t) {
         r eturn O u(t, fu nction  (e) {
              if  (Ru.tes t(e)) { 
                  var  r,
                       n = [ ],
                       i = [ ],
                       s = 0 
                  for  (r = e. length;  s < r;  ) {
                       var  u = e. charCod eAt(s++ )
                       if (55 296 <=  u && 56 319 >=  u && s  < r) {
                            var  l = e.c harCode At(s++) 
                           ;(l  & 6451 2) == 5 6320 ?  i.push( ((u & 1 023) <<  10) +  (l & 10 23) + 6 5536) :  (i.pus h(u), s --)
                       } el se i.pu sh(u)
                   }
                  ;( e = i),  (l = e .length ), (i =  128)
                   var g  = 0,
                       p =  72
                  f or (u =  0; u <  l; ++u ) {
                       var  a = e[u ]
                       128 >  a && n. push(Sn (a))
                   }
                  for  ((s =  r = n.l ength)  && n.pu sh("-") ; s < l ; ) {
                       va r y = 2 1474836 47
                       for ( u = 0;  u < l;  ++u) (a  = e[u] ), a >=  i && a  < y &&  (y = a )
                       var v  = s + 1 
                       if (y -  i > Te ((21474 83647 -  g) / v )) thro w new R angeErr or(Eo.o verflow )
                       for (g  += (y  - i) *  v, i =  y, u =  0; u <  l; ++u)  {
                           i f (((a  = e[u]) , a < i  && 214 7483647  < ++g) ) throw  new Ra ngeErro r(Eo.ov erflow) 
                           if  (a == i ) {
                                var  w = g
                                 for (y  = 36; ( a = y < = p ? 1  : y >=  p + 26  ? 26 :  y - p) , !(w <  a); y  += 36)  {
                                    v ar O =  w - a
                                     ;(w  = 36 -  a), n.p ush(Sn( _o(a +  (O % w) , 0))),  (w = T e(O / w ))
                                }
                                fo r (n.pu sh(Sn(_ o(w, 0) )), p =  v, y =  0, g =  s == r  ? Te(g  / 700)  : g >>  1, g + = Te(g  / p); 4 55 < g;  y += 3 6) g =  Te(g /  35)
                                ;(p  = Te(y  + (36  * g) /  (g + 38 ))), (g  = 0),  ++s
                            }
                       }
                       ++g,  ++i
                  } 
                  n =  "xn--"  + n.joi n("")
              } e lse n =  e
              return  n
         })
     }
     var  So =
         A rray.is Array | |
         func tion (t ) {
              retur n Objec t.proto type.to String. call(t)  === "[ object  Array]" 
         }
     functi on \$e(t ) {
         sw itch (t ypeof t ) {
              case  "string ":
                  re turn t
              ca se "boo lean":
                   retur n t ? " true" :  "false "
              case "n umber": 
                  retu rn isFi nite(t)  ? t :  ""
              defaul t:
                  re turn "" 
         }
     }
     functio n Iu(t,  e, r,  n) {
         r eturn ( 
             ( e = e | | "&"), 
             ( r = r | | "="), 
             t  === nu ll && ( t = voi d 0),
              typ eof t = = "obje ct"
                  ?  Ro(Nu( t), fun ction ( i) {
                         v ar s =  encodeU RICompo nent(\$e (i)) +  r
                         retu rn So(t [i])
                              ? Ro (t[i],  functio n (u) { 
                                    re turn s  + encod eURICom ponent( \$e(u))
                                 }).join (e)
                              : s +  encode URIComp onent(\$ e(t[i]) )
                    } ).join( e)
                  :  n
                  ? e ncodeUR ICompon ent(\$e( n)) + r  + enco deURICo mponent (\$e(t)) 
                  : "" 
         )
     }
     functio n Ro(t,  e) {
          if (t.m ap) ret urn t.m ap(e)
          for (va r r = [ ], n =  0; n <  t.lengt h; n++)  r.push (e(t[n] , n))
          return  r
    } 
    va r Nu =
          Object .keys | |
         func tion (t ) {
              var e  = [],
                   r
              for ( r in t)  Object .protot ype.has OwnProp erty.ca ll(t, r ) && e. push(r) 
             r eturn e 
         }
     functi on Ao(t , e, r,  n) {
          r = r | | "="
          var i =  {}
         if  (typeo f t !=  "string " || t. length  === 0)  return  i
         var  s = /\\+ /g
         for  (t = t .split( e || "& "), e =  1e3, n  && typ eof n.m axKeys  == "num ber" &&  (e = n .maxKey s), n =  t.leng th, 0 <  e && n  > e &&  (n = e ), e =  0; e <  n; ++e)  {
              var u  = t[e]. replace (s, "%2 0"),
                   l = u.i ndexOf( r)
              if (0  <= l) { 
                  var  g = u.s ubstr(0 , l)
                   u = u.s ubstr(l  + 1)
              } e lse (g  = u), ( u = "") 
             ; (g = de codeURI Compone nt(g)),  (u = d ecodeUR ICompon ent(u)) , Objec t.proto type.ha sOwnPro perty.c all(i,  g) ? (S o(i[g])  ? i[g] .push(u ) : (i[ g] = [i [g], u] )) : (i [g] = u )
         }
         r eturn i 
    }
     var  ku = {  parse:  wr, re solve:  xu, res olveObj ect: ju , forma t: Mu,  Url: Ot  }
     functio n Ot()  {
         this .href =  this.p ath = t his.pat hname =  this.q uery =  this.se arch =  this.ha sh = th is.host name =  this.po rt = th is.host  = this .auth =  this.s lashes  = this. protoco l = nul l
    } 
    va r Lu =  /^([a-z 0-9.+-] +:)/i,
          Pu = / :[0-9]* \$/,
         Cu  = /^(\\ /\\/?(?! \\/)[^\\? \\s]*)(\\ ?[^\\s]* )?\$/,
          Bu = "{ }|\\\\^\`" .split( "").con cat('<> "\` \\r\\n 	'.spli t("")), 
         Rn =  ["'"].c oncat(B u),
         Oo  = ["%" , "/",  "?", "; ", "#"] .concat (Rn),
          To = [" /", "?" , "#"], 
         Fu =  255,
         I o = /^[ +a-z0-9 A-Z_-]{ 0,63}\$/ ,
         Uu =  /^([+a -z0-9A- Z_-]{0, 63})(.* )\$/,
         D u = { j avascri pt: !0,  "javas cript:" : !0 }, 
         An =  { javas cript:  !0, "ja vascrip t:": !0  },
         Ie  = { ht tp: !0,  https:  !0, ft p: !0,  gopher:  !0, fi le: !0,  "http: ": !0,  "https: ": !0,  "ftp:":  !0, "g opher:" : !0, " file:":  !0 }
     func tion wr (t, e,  r) {
         i f (t &&  zt(t)  && t in stanceo f Ot) r eturn t 
         var n  = new  Ot()
         r eturn n .parse( t, e, r ), n
     }
     Ot.pro totype. parse =  functi on (t,  e, r) { 
         retur n No(th is, t,  e, r)
     }
     funct ion No( t, e, r , n) {
          if (!i e(e)) t hrow ne w TypeE rror("P aramete r 'url'  must b e a str ing, no t " + t ypeof e )
         var  i = e.i ndexOf( "?")
         i f (((i  = i !==  -1 &&  i < e.i ndexOf( "#") ?  "?" : " #"), (e  = e.sp lit(i)) , (e[0]  = e[0] .replac e(/\\\\/g , "/")) , (e =  e.join( i)), (i  = e.tr im()),  !n && e .split( "#").le ngth == = 1 &&  (e = Cu .exec(i )))) re turn (t .path =  i), (t .href =  i), (t .pathna me = e[ 1]), e[ 2] ? (( t.searc h = e[2 ]), (t. query =  r ? Ao (t.sear ch.subs tr(1))  : t.sea rch.sub str(1)) ) : r & & ((t.s earch =  ""), ( t.query  = {})) , t
         if  ((e =  Lu.exec (i))) { 
             e  = e[0] 
             v ar s =  e.toLow erCase( )
              ;(t.pro tocol =  s), (i  = i.su bstr(e. length) )
         }
         i f (n ||  e || i .match( /^\\/\\/[ ^@\\/]+@ [^@\\/]+ /)) {
              var  u = i. substr( 0, 2) = == "//" 
             ! u || (e  && An[ e]) ||  ((i = i .substr (2)), ( t.slash es = !0 ))
         }
          if (!An [e] &&  (u || ( e && !I e[e])))  {
              for (e  = -1,  n = 0;  n < To. length;  n++) ( u = i.i ndexOf( To[n])) , u !==  -1 &&  (e ===  -1 || u  < e) & & (e =  u)
              for (u  = e == = -1 ?  i.lastI ndexOf( "@") :  i.lastI ndexOf( "@", e) , u !==  -1 &&  ((n = i .slice( 0, u)),  (i = i .slice( u + 1)) , (t.au th = de codeURI Compone nt(n))) , e = - 1, n =  0; n <  Oo.leng th; n++ ) (u =  i.index Of(Oo[n ])), u  !== -1  && (e = == -1 | | u < e ) && (e  = u)
              if  ((e ===  -1 &&  (e = i. length) , (t.ho st = i. slice(0 , e)),  (i = i. slice(e )), ko( t), (t. hostnam e = t.h ostname  || "") , (u =  t.hostn ame[0]  === "["  && t.h ostname [t.host name.le ngth -  1] ===  "]"), ! u)) {
                   var l  = t.hos tname.s plit(/\\ ./)
                  f or (n =  0, e =  l.leng th; n <  e; n++ ) {
                       var  g = l[n ]
                       if (g  && !g.m atch(Io )) {
                            for (v ar p =  "", a =  0, y =  g.leng th; a <  y; a++ ) p = 1 27 < g. charCod eAt(a)  ? p + " x" : p  + g[a]
                            if ( !p.matc h(Io))  {
                                ;(e =  l.slic e(0, n) ), (n =  l.slic e(n + 1 )), (g  = g.mat ch(Uu))  && (e. push(g[ 1]), n. unshift (g[2])) , n.len gth &&  (i = "/ " + n.j oin("." ) + i),  (t.hos tname =  e.join ("."))
                                 break
                            }
                       }
                   }
              }
              ;(t.hos tname =  t.host name.le ngth >  Fu ? ""  : t.ho stname. toLower Case()) , u ||  (t.host name =  Tu(t.ho stname) ), (n =  t.port  ? ":"  + t.por t : "") , (t.ho st = (t .hostna me || " ") + n) , (t.hr ef += t .host),  u && ( (t.host name =  t.hostn ame.sub str(1,  t.hostn ame.len gth - 2 )), i[0 ] !== " /" && ( i = "/"  + i))
          }
         if  (!Du[s] ) for ( n = 0,  e = Rn. length;  n < e;  n++) ( u = Rn[ n]), i. indexOf (u) !==  -1 &&  ((g = e ncodeUR ICompon ent(u)) , g ===  u && ( g = esc ape(u)) , (i =  i.split (u).joi n(g)))
          return  (n = i .indexO f("#")) , n !==  -1 &&  ((t.has h = i.s ubstr(n )), (i  = i.sli ce(0, n ))), (n  = i.in dexOf(" ?")), n  !== -1  ? ((t. search  = i.sub str(n)) , (t.qu ery = i .substr (n + 1) ), r &&  (t.que ry = Ao (t.quer y)), (i  = i.sl ice(0,  n))) :  r && (( t.searc h = "") , (t.qu ery = { })), i  && (t.p athname  = i),  Ie[s] & & t.hos tname & & !t.pa thname  && (t.p athname  = "/") , (t.pa thname  || t.se arch) & & ((n =  t.path name ||  ""), ( t.path  = n + ( t.searc h || "" ))), (t .href =  On(t)) , t
     }
     functio n Mu(t)  {
         ret urn ie( t) && ( t = No( {}, t)) , On(t) 
    }
     fun ction O n(t) {
          var e  = t.aut h || "" 
         e &&  ((e = e ncodeUR ICompon ent(e)) , (e =  e.repla ce(/%3A /i, ":" )), (e  += "@") )
         var  r = t.p rotocol  || "", 
             n  = t.pa thname  || "",
              i  = t.has h || "" ,
              s = !1, 
             u  = ""
          return  (
              t.host  ? (s =  e + t.h ost) :  t.hostn ame &&  ((s = e  + (t.h ostname .indexO f(":")  === -1  ? t.hos tname :  "[" +  this.ho stname  + "]")) , t.por t && (s  += ":"  + t.po rt)),
              t.q uery &&  zt(t.q uery) & & Objec t.keys( t.query ).lengt h && (u  = Iu(t .query) ),
              (e = t .search  || (u  && "?"  + u) ||  ""),
              r & & r.sub str(-1)  !== ": " && (r  += ":" ),
              t.slas hes ||  ((!r ||  Ie[r])  && s ! == !1)  ? ((s =  "//" +  (s ||  "")), n  && n.c harAt(0 ) !== " /" && ( n = "/"  + n))  : s ||  (s = "" ),
              i && i .charAt (0) !==  "#" &&  (i = " #" + i) ,
              e && e. charAt( 0) !==  "?" &&  (e = "? " + e), 
             ( n = n.r eplace( /[?#]/g , funct ion (l)  {
                  re turn en codeURI Compone nt(l)
              })) ,
              (e = e. replace ("#", " %23")), 
             r  + s +  n + e +  i
         )
     }
     Ot.pr ototype .format  = func tion ()  {
         ret urn On( this)
     }
     funct ion xu( t, e) { 
         retur n wr(t,  !1, !0 ).resol ve(e)
     }
     Ot.pr ototype .resolv e = fun ction ( t) {
         r eturn t his.res olveObj ect(wr( t, !1,  !0)).fo rmat()
     }
     func tion ju (t, e)  {
         retu rn t ?  wr(t, ! 1, !0). resolve Object( e) : e
     }
     ;(Ot .protot ype.res olveObj ect = f unction  (t) {
          if (ie (t)) {
              va r e = n ew Ot() 
             e .parse( t, !1,  !0), (t  = e)
          }
         e =  new Ot( )
         for  (var r  = Objec t.keys( this),  n = 0;  n < r.l ength;  n++) {
              va r i = r [n]
              e[i]  = this[ i]
         }
          if (((e .hash =  t.hash ), t.hr ef ===  "")) re turn (e .href =  e.form at()),  e
         if ( t.slash es && ! t.proto col) {
              fo r (r =  Object. keys(t) , n = 0 ; n < r .length ; n++)  (i = r[ n]), i  !== "pr otocol"  && (e[ i] = t[ i])
              retur n Ie[e. protoco l] && e .hostna me && ! e.pathn ame &&  (e.path  = e.pa thname  = "/"),  (e.hre f = e.f ormat() ), e
         } 
         var s 
         if (t .protoc ol && t .protoc ol !==  e.proto col) {
              if  (!Ie[t .protoc ol]) {
                   for ( r = Obj ect.key s(t), n  = 0; n  < r.le ngth; n ++) (i  = r[n]) , (e[i]  = t[i] )
                  ret urn (e. href =  e.forma t()), e 
             } 
             i f (((e. protoco l = t.p rotocol ), t.ho st || A n[t.pro tocol]) ) e.pat hname =  t.path name
              else  {
                  fo r (s =  (t.path name ||  "").sp lit("/" ); s.le ngth &&  !(t.ho st = s. shift() ); );
                   t.host  || (t. host =  ""), t. hostnam e || (t .hostna me = "" ), s[0]  !== ""  && s.u nshift( ""), 2  > s.len gth &&  s.unshi ft(""),  (e.pat hname =  s.join ("/"))
              }
              re turn (e .search  = t.se arch),  (e.quer y = t.q uery),  (e.host  = t.ho st || " "), (e. auth =  t.auth) , (e.ho stname  = t.hos tname | | t.hos t), (e. port =  t.port) , (e.pa thname  || e.se arch) & & (e.pa th = (e .pathna me || " ") + (e .search  || "") ), (e.s lashes  = e.sla shes ||  t.slas hes), ( e.href  = e.for mat()),  e
         }
          r = e.p athname  && e.p athname .charAt (0) ===  "/"
         v ar u =  t.host  || (t.p athname  && t.p athname .charAt (0) ===  "/"),
              l  = (r =  u || r  || (e.h ost &&  t.pathn ame))
          if (((n  = (e.p athname  && e.p athname .split( "/")) | | []),  (i = e. protoco l && !I e[e.pro tocol]) , (s =  (t.path name &&  t.path name.sp lit("/" )) || [ ]), i & & ((e.h ostname  = ""),  (e.por t = nul l), e.h ost &&  (n[0] = == "" ?  (n[0]  = e.hos t) : n. unshift (e.host )), (e. host =  ""), t. protoco l && (( t.hostn ame = n ull), ( t.port  = null) , t.hos t && (s [0] ===  "" ? ( s[0] =  t.host)  : s.un shift(t .host)) , (t.ho st = nu ll)), ( r = r & & (s[0]  === ""  || n[0 ] === " "))), u )) (e.h ost = t .host | | t.hos t === " " ? t.h ost : e .host),  (e.hos tname =  t.host name ||  t.host name == = "" ?  t.hostn ame : e .hostna me), (e .search  = t.se arch),  (e.quer y = t.q uery),  (n = s) 
         else  if (s.l ength)  n || (n  = []),  n.pop( ), (n =  n.conc at(s)),  (e.sea rch = t .search ), (e.q uery =  t.query )
         else  if (t. search  != null ) retur n i &&  ((e.hos tname =  e.host  = n.sh ift()),  (i = e .host & & 0 < e .host.i ndexOf( "@") ?  e.host. split(" @") : ! 1)) &&  ((e.aut h = i.s hift()) , (e.ho st = e. hostnam e = i.s hift()) ), (e.s earch =  t.sear ch), (e .query  = t.que ry), (e .pathna me !==  null ||  e.sear ch !==  null) & & (e.pa th = (e .pathna me ? e. pathnam e : "")  + (e.s earch ?  e.sear ch : "" )), (e. href =  e.forma t()), e 
         if (! n.lengt h) retu rn (e.p athname  = null ), (e.p ath = e .search  ? "/"  + e.sea rch : n ull), ( e.href  = e.for mat()),  e
         ;(u  = n.sl ice(-1) [0]), ( s = ((e .host | | t.hos t || 1  < n.len gth) &&  (u ===  "." ||  u ===  ".."))  || u == = "")
          for (va r g = 0 , p = n .length ; 0 <=  p; p--)  (u = n [p]), u  === ". " ? n.s plice(p , 1) :  u === " .." ? ( n.splic e(p, 1) , g++)  : g &&  (n.spli ce(p, 1 ), g--) 
         if (! r && !l ) for ( ; g--;  g) n.un shift(" ..")
         r eturn ! r || n[ 0] ===  "" || ( n[0] &&  n[0].c harAt(0 ) === " /") ||  n.unshi ft(""),  s && n .join(" /").sub str(-1)  !== "/ " && n. push("" ), (l =  n[0] = == "" | | (n[0]  && n[0 ].charA t(0) == = "/")) , i &&  ((e.hos tname =  e.host  = l ?  "" : n. length  ? n.shi ft() :  ""), (i  = e.ho st && 0  < e.ho st.inde xOf("@" ) ? e.h ost.spl it("@")  : !1))  && ((e .auth =  i.shif t()), ( e.host  = e.hos tname =  i.shif t())),  (r = r  || (e.h ost &&  n.lengt h)) &&  !l && n .unshif t(""),  n.lengt h ? (e. pathnam e = n.j oin("/" )) : (( e.pathn ame = n ull), ( e.path  = null) ), (e.p athname  !== nu ll || e .search  !== nu ll) &&  (e.path  = (e.p athname  ? e.pa thname  : "") +  (e.sea rch ? e .search  : "")) , (e.au th = t. auth ||  e.auth ), (e.s lashes  = e.sla shes ||  t.slas hes), ( e.href  = e.for mat()),  e
     }),
         (O t.proto type.pa rseHost  = func tion ()  {
              return  ko(thi s)
         })
     fun ction k o(t) {
          var e  = t.hos t,
              r = Pu .exec(e )
         r &&  ((r =  r[0]),  r !== " :" && ( t.port  = r.sub str(1)) , (e =  e.subst r(0, e. length  - r.len gth))),  e && ( t.hostn ame = e )
    } 
    va r Lo =  b(funct ion (t,  e) {
          functio n r(s,  u) {
              retu rn (s =  s[u]),  0 < u  && (s = == "/"  || (i & & s ===  "\\\\")) 
         }
         fu nction  n(s) {
              va r u = 1  < argu ments.l ength & & argum ents[1]  !== vo id 0 ?  argumen ts[1] :  !0
              if (i ) {
                  v ar l =  s
                  if  (typeof  l != " string" ) throw  new Ty peError ("expec ted a s tring") 
                  if ( ((l = l .replac e(/[\\\\\\ /]+/g,  "/")),  u !== ! 1))
                       if ( ((u = l ), (l =  u.leng th - 1) , 2 > l )) l =  u
                       else { 
                           for  (; r(u , l); )  l--
                            l = u. substr( 0, l +  1)
                       }
                  r eturn l .replac e(/^([a -zA-Z]+ :|\\.\\/) /, "")
              }
              re turn s
          }
         Obj ect.def ineProp erty(e,  "__esM odule",  { valu e: !0 } ),
              (e.uni xify =  n),
              (e.co rrectPa th = fu nction  (s) {
                   return  n(s.re place(/ ^\\\\\\\\\\? \\\\.:\\\\/ , "\\\\") )
              })
         var  i = _e .platfo rm ===  "win32" 
    }) 
    et (Lo)
     var s e = b(f unction  (t, e)  {
         fun ction r (c, o)  {
              return  o === v oid 0 & & (o =  st.defa ult.cwd ()), D( o, c)
          }
         func tion n( c, o) { 
             r eturn t ypeof c  == "fu nction"  ? [i() , c] :  [i(c),  y(o)]
          }
         func tion i( c) {
              retu rn c == = void  0 && (c  = {}),  P({},  Ju, c)
          }
         fun ction s (c) {
              ret urn typ eof c = = "numb er" ? P ({}, zo , { mod e: c })  : P({} , zo, c )
         }
         f unction  u(c, o , f, h)  {
              o ===  void 0  && (o =  ""), f  === vo id 0 &&  (f = " "), h = == void  0 && ( h = "") 
             v ar d =  ""
              switch  ((f &&  (d = "  '" + f  + "'") , h &&  (d += "  -> '"  + h + " '"), c) ) {
                  c ase "EN OENT":
                       r eturn " ENOENT:  no suc h file  or dire ctory,  " + o +  d
                  ca se "EBA DF":
                       ret urn "EB ADF: ba d file  descrip tor, "  + o + d 
                  case  "EINVA L":
                       retu rn "EIN VAL: in valid a rgument , " + o  + d
                   case "E PERM":
                       r eturn " EPERM:  operati on not  permitt ed, " +  o + d
                   case  "EPROTO ":
                       retur n "EPRO TO: pro tocol e rror, "  + o +  d
                  cas e "EEXI ST":
                       ret urn "EE XIST: f ile alr eady ex ists, "  + o +  d
                  cas e "ENOT DIR":
                       re turn "E NOTDIR:  not a  directo ry, " +  o + d
                   case  "EISDIR ":
                       retur n "EISD IR: ill egal op eration  on a d irector y, " +  o + d
                   case " EACCES" :
                       return  "EACCE S: perm ission  denied,  " + o  + d
                  c ase "EN OTEMPTY ":
                       retur n "ENOT EMPTY:  directo ry not  empty,  " + o +  d
                  ca se "EMF ILE":
                       re turn "E MFILE:  too man y open  files,  " + o +  d
                  ca se "ENO SYS":
                       re turn "E NOSYS:  functio n not i mplemen ted, "  + o + d 
                  defa ult:
                       ret urn c +  ": err or occu rred, "  + o +  d
              }
         }
         f unction  l(c, o , f, h,  d) {
              ret urn o = == void  0 && ( o = "") , f ===  void 0  && (f  = ""),  h === v oid 0 & & (h =  ""), d  === voi d 0 &&  (d = Er ror), ( o = new  d(u(c,  o, f,  h))), ( o.code  = c), o 
         }
         fu nction  g(c) {
              if  (typeo f c ==  "number ") retu rn c
              if ( typeof  c == "s tring")  {
                  va r o = f e[c]
                   if (typ eof o <  "u") r eturn o 
             } 
             t hrow ne w De.Ty peError ("ERR_I NVALID_ OPT_VAL UE", "f lags",  c)
         }
          functio n p(c,  o) {
              if ( o) {
                   var f =  typeof  o
                  sw itch (f ) {
                       case  "strin g":
                            c = P({ }, c, {  encodi ng: o } )
                           br eak
                       case  "objec t":
                            c = P({ }, c, o )
                           br eak
                       defa ult:
                            throw  TypeErr or("Exp ected o ptions  to be e ither a n objec t or a  string,  but go t " + f  + " in stead") 
                  }
              } el se retu rn c
              retu rn c.en coding  !== "bu ffer" & & pt.as sertEnc oding(c .encodi ng), c
          }
         fun ction a (c) {
              ret urn fun ction ( o) {
                   return  p(c, o) 
             } 
         }
         fu nction  y(c) {
              if  (typeo f c !=  "functi on") th row Typ eError( Ft.CB)
              re turn c
          }
         fun ction v (c) {
              ret urn fun ction ( o, f) { 
                  retu rn type of o ==  "funct ion" ?  [c(), o ] : [c( o), y(f )]
              }
         }
          functio n w(c)  {
              if (typ eof c ! = "stri ng" &&  !G.Buff er.isBu ffer(c) ) {
                  t ry {
                       if  (!(c in stanceo f ku.UR L)) thr ow new  TypeErr or(Ft.P ATH_STR )
                  } c atch {
                       t hrow ne w TypeE rror(Ft .PATH_S TR)
                  } 
                  if ( c.hostn ame !==  "") th row new  De.Typ eError( "ERR_IN VALID_F ILE_URL _HOST",  st.def ault.pl atform) 
                  c =  c.pathn ame
                  f or (var  o = 0;  o < c. length;  o++)
                       if  (c[o]  === "%" ) {
                            var f =  c.code PointAt (o + 2)  | 32
                            if (c [o + 1]  === "2 " && f  === 102 ) throw  new De .TypeEr ror("ER R_INVAL ID_FILE _URL_PA TH", "m ust not  includ e encod ed / ch aracter s")
                       }
                   c = dec odeURIC omponen t(c)
              }
              retu rn (c =  String (c)), u e(c), c 
         }
         fu nction  O(c, o)  {
              return  (c = r (c, o). substr( 1)) ? c .split( dt) : [ ]
         }
         f unction  \$(c) { 
             r eturn O (w(c))
          }
         fun ction T t(c, o)  {
              return  o ===  void 0  && (o =  pt.ENC ODING_U TF8), G .Buffer .isBuff er(c) ?  c : c  instanc eof Uin t8Array  ? G.bu fferFro m(c) :  G.buffe rFrom(S tring(c ), o)
          }
         func tion Bt (c, o)  {
              return  o && o  !== "bu ffer" ?  c.toSt ring(o)  : c
         } 
         funct ion ue( c, o) { 
             i f ((""  + c).in dexOf(" \\0") != = -1) t hrow (( c = Err or("Pat h must  be a st ring wi thout n ull byt es")),  (c.code  = "ENO ENT"),  c)
              return  !0
         }
          functi on rt(c , o) {
              if  (((c =  typeof  c == " number"  ? c :  typeof  c == "s tring"  ? parse Int(c,  8) : o  ? rt(o)  : void  0), ty peof c  != "num ber" ||  isNaN( c))) th row new  TypeEr ror(Ft. MODE_IN T)
              return  c
         }
          functio n qt(c)  {
              if (c  >>> 0 ! == c) t hrow Ty peError (Ft.FD) 
         }
         fu nction  gt(c) { 
             i f (type of c ==  "strin g" && + c == c)  return  +c
              if (c  instan ceof Da te) ret urn c.g etTime( ) / 1e3 
             i f (isFi nite(c) ) retur n 0 > c  ? Date .now()  / 1e3 :  c
              throw  Error(" Cannot  parse t ime: "  + c)
         } 
         funct ion m(c ) {
              if (t ypeof c  != "nu mber")  throw T ypeErro r(Ft.UI D)
         }
          functio n E(c)  {
              if (typ eof c ! = "numb er") th row Typ eError( Ft.GID) 
         }
         fu nction  A(c) {
              c. emit("s top")
          }
         func tion I( c, o, f ) {
              if (! (this i nstance of I))  return  new I(c , o, f) 
             i f (((th is._vol  = c),  (f = P( {}, p(f , {}))) , f.hig hWaterM ark ===  void 0  && (f. highWat erMark  = 65536 ), ft.R eadable .call(t his, f) , (this .path =  w(o)),  (this. fd = f. fd ===  void 0  ? null  : f.fd) , (this .flags  = f.fla gs ===  void 0  ? "r" :  f.flag s), (th is.mode  = f.mo de ===  void 0  ? 438 :  f.mode ), (thi s.start  = f.st art), ( this.en d = f.e nd), (t his.aut oClose  = f.aut oClose  === voi d 0 ? ! 0 : f.a utoClos e), (th is.pos  = void  0), (th is.byte sRead =  0), th is.star t !== v oid 0))  {
                  if  (typeo f this. start ! = "numb er") th row new  TypeEr ror('"s tart" o ption m ust be  a Numbe r')
                  i f (this .end == = void  0) this .end =  1 / 0
                   else i f (type of this .end !=  "numbe r") thr ow new  TypeErr or('"en d" opti on must  be a N umber') 
                  if ( this.st art > t his.end ) throw  Error( '"start " optio n must  be <= " end" op tion')
                   this. pos = t his.sta rt
              }
              typeof  this.f d != "n umber"  && this .open() ,
                  thi s.on("e nd", fu nction  () {
                       thi s.autoC lose &&  this.d estroy  && this .destro y()
                  } )
         }
         f unction  k() {
              th is.clos e()
         }
          functi on L(c,  o, f)  {
              if (!(t his ins tanceof  L)) re turn ne w L(c,  o, f)
              if  (((this ._vol =  c), (f  = P({} , p(f,  {}))),  ft.Writ able.ca ll(this , f), ( this.pa th = w( o)), (t his.fd  = f.fd  === voi d 0 ? n ull : f .fd), ( this.fl ags = f .flags  === voi d 0 ? " w" : f. flags),  (this. mode =  f.mode  === voi d 0 ? 4 38 : f. mode),  (this.s tart =  f.start ), (thi s.autoC lose =  f.autoC lose == = void  0 ? !0  : !!f.a utoClos e), (th is.pos  = void  0), (th is.byte sWritte n = 0),  this.s tart != = void  0)) {
                   if (ty peof th is.star t != "n umber")  throw  new Typ eError( '"start " optio n must  be a Nu mber')
                   if (0  > this .start)  throw  Error(' "start"  must b e >= ze ro')
                   this.po s = thi s.start 
             } 
             f .encodi ng && t his.set Default Encodin g(f.enc oding), 
                  type of this .fd !=  "number " && th is.open (),
                  t his.onc e("fini sh", fu nction  () {
                       thi s.autoC lose &&  this.c lose()
                   })
         } 
         var C  =
                  (H  && H._ _extend s) ||
                   (funct ion ()  {
                       functi on c(o,  f) {
                            retur n (
                                (c  =
                                    O bject.s etProto typeOf  ||
                                     ({ __pr oto__:  [] } in stanceo f Array  &&
                                         fu nction  (h, d)  {
                                              h.__pro to__ =  d
                                         }) | |
                                    f unction  (h, d)  {
                                         for  (var _  in d)  d.hasOw nProper ty(_) & & (h[_]  = d[_] )
                                    } ),
                                c(o,  f)
                            )
                       }
                       retur n funct ion (o,  f) {
                            funct ion h()  {
                                this .constr uctor =  o
                           } 
                           c(o , f), ( o.proto type =  f === n ull ? O bject.c reate(f ) : ((h .protot ype = f .protot ype), n ew h()) )
                       }
                  }) (),
              B =
                   (H &&  H.__spr eadArra ys) ||
                   funct ion ()  {
                       for (v ar c =  0, o =  0, f =  argumen ts.leng th; o <  f; o++ ) c +=  argumen ts[o].l ength
                       c  = Array (c)
                       var  h = 0
                       fo r (o =  0; o <  f; o++)  for (v ar d =  argumen ts[o],  _ = 0,  N = d.l ength;  _ < N;  _++, h+ +) c[h]  = d[_] 
                       return  c
                  }
          Object. defineP roperty (e, "__ esModul e", { v alue: ! 0 })
         v ar P =  Su.exte nd,
              D = y n.resol ve,
              M = F .consta nts.O_R DONLY,
              W  = F.con stants. O_WRONL Y,
              X = F. constan ts.O_RD WR,
              J = F .consta nts.O_C REAT,
              Er  = F.con stants. O_EXCL, 
             W e = F.c onstant s.O_TRU NC,
              Ge =  F.const ants.O_ APPEND, 
             F o = F.c onstant s.O_SYN C,
              zu = F .consta nts.O_D IRECTOR Y,
              Uo = F .consta nts.F_O K,
              Vu = F .consta nts.COP YFILE_E XCL,
              qu =  F.cons tants.C OPYFILE _FICLON E_FORCE ,
              dt = yn .sep,
              Do  = yn.re lative, 
             I n = st. default .platfo rm ===  "win32" ,
              Ft = {  PATH_ST R: "pat h must  be a st ring or  Buffer ", FD:  "fd mus t be a  file de scripto r", MOD E_INT:  "mode m ust be  an int" , CB: " callbac k must  be a fu nction" , UID:  "uid mu st be a n unsig ned int ", GID:  "gid m ust be  an unsi gned in t", LEN : "len  must be  an int eger",  ATIME:  "atime  must be  an int eger",  MTIME:  "mtime  must be  an int eger",  PREFIX:  "filen ame pre fix is  require d", BUF FER: "b uffer m ust be  an inst ance of  Buffer  or Sta ticBuff er", OF FSET: " offset  must be  an int eger",  LENGTH:  "lengt h must  be an i nteger" , POSIT ION: "p osition  must b e an in teger"  },
              fe
         ;( functio n (c) { 
             ; (c[(c.r  = M)]  = "r"),  (c[(c[ "r+"] =  X)] =  "r+"),  (c[(c.r s = M |  Fo)] =  "rs"),  (c[(c. sr = c. rs)] =  "sr"),  (c[(c[" rs+"] =  X | Fo )] = "r s+"), ( c[(c["s r+"] =  c["rs+" ])] = " sr+"),  (c[(c.w  = W |  J | We) ] = "w" ), (c[( c.wx =  W | J |  We | E r)] = " wx"), ( c[(c.xw  = c.wx )] = "x w"), (c [(c["w+ "] = X  | J | W e)] = " w+"), ( c[(c["w x+"] =  X | J |  We | E r)] = " wx+"),  (c[(c[" xw+"] =  c["wx+ "])] =  "xw+"),  (c[(c. a = W |  Ge | J )] = "a "), (c[ (c.ax =  W | Ge  | J |  Er)] =  "ax"),  (c[(c.x a = c.a x)] = " xa"), ( c[(c["a +"] = X  | Ge |  J)] =  "a+"),  (c[(c[" ax+"] =  X | Ge  | J |  Er)] =  "ax+"),  (c[(c[ "xa+"]  = c["ax +"])] =  "xa+") 
         })((f e = e.F LAGS ||  (e.FLA GS = {} ))),
              (e.f lagsToN umber =  g),
              (t =  { enco ding: " utf8" } )
         var  _r = a( t),
              Mo =  v(_r),
              xo  = a({  flag: " r" }),
              jo  = { en coding:  "utf8" , mode:  438, f lag: fe [fe.w]  },
              Yo = a (jo),
              \$o  = { enc oding:  "utf8",  mode:  438, fl ag: fe[ fe.a] } ,
              Wo = a( \$o),
              Ku =  v(Wo), 
             G o = a(t ),
              Hu = v (Go),
              zo  = { mod e: 511,  recurs ive: !1  },
              Vo =  { recur sive: ! 1 },
              qo =  a({ en coding:  "utf8" , withF ileType s: !1 } ),
              Xu = v (qo),
              Ju  = { big int: !1  }
         if  (((e.pa thToFil ename =  w), In )) {
              var  Zu = r, 
                  Qu =  Lo.uni xify
              r =  functio n (c, o ) {
                  r eturn Q u(Zu(c,  o))
              }
         } 
         ;(e.f ilename ToSteps  = O),
              (e .pathTo Steps =  \$),
              (e.d ataToSt r = fun ction ( c, o) { 
                  retu rn o == = void  0 && (o  = pt.E NCODING _UTF8),  G.Buff er.isBu ffer(c)  ? c.to String( o) : c  instanc eof Uin t8Array  ? G.bu fferFro m(c).to String( o) : St ring(c) 
             } ),
              (e.dat aToBuff er = Tt ),
              (e.buf ferToEn coding  = Bt),
              (e .toUnix Timesta mp = gt ),
              (t = ( functio n () {
                   funct ion c(o ) {
                       o == = void  0 && (o  = {}),  (this. ino = 0 ), (thi s.inode s = {}) , (this .releas edInos  = []),  (this.f ds = {} ), (thi s.relea sedFds  = []),  (this.m axFiles  = 1e4) , (this .openFi les = 0 ), (thi s.promi sesApi  = wo.de fault(t his)),  (this.s tatWatc hers =  {}), (t his.pro ps = P( { Node:  xe.Nod e, Link : xe.Li nk, Fil e: xe.F ile },  o)), (o  = this .create Link()) , o.set Node(th is.crea teNode( !0))
                       var  f = th is
                       ;(thi s.StatW atcher  = (func tion (h ) {
                            functio n d() { 
                                return  h.call (this,  f) || t his
                            }
                           re turn C( d, h),  d
                       })(Ko) ),
                           ( this.Re adStrea m = (fu nction  (h) {
                                f unction  d() {
                                     for  (var _  = [],  N = 0;  N < arg uments. length;  N++) _ [N] = a rgument s[N]
                                     retur n h.app ly(this , B([f] , _)) | | this
                                 }
                                retur n C(d,  h), d
                            })(I) ),
                           ( this.Wr iteStre am = (f unction  (h) {
                                 functio n d() { 
                                    fo r (var  _ = [],  N = 0;  N < ar guments .length ; N++)  _[N] =  argumen ts[N]
                                     retu rn h.ap ply(thi s, B([f ], _))  || this 
                                }
                                retu rn C(d,  h), d
                            })(L )),
                            (this.F SWatche r = (fu nction  (h) {
                                f unction  d() {
                                     ret urn h.c all(thi s, f) | | this
                                 }
                                retur n C(d,  h), d
                            })(Ho )),
                            (this.r oot = o )
                  }
                   return  (
                       (c.fr omJSON  = funct ion (o,  f) {
                            var h  = new  c()
                            return  h.fromJ SON(o,  f), h
                       }) ,
                       Object .define Propert y(c.pro totype,  "promi ses", { 
                           get : funct ion ()  {
                                if (t his.pro misesAp i === n ull) th row Err or("Pro mise is  not su pported  in thi s envir onment. ")
                                retu rn this .promis esApi
                            },
                            enumer able: ! 0,
                           c onfigur able: ! 0,
                       }),
                       (c .protot ype.cre ateLink  = func tion (o , f, h,  d) {
                            if (( h === v oid 0 & & (h =  !1), !o )) retu rn new  this.pr ops.Lin k(this,  null,  "")
                            if (!f)  throw  Error(" createL ink: na me cann ot be e mpty")
                            retu rn o.cr eateChi ld(f, t his.cre ateNode (h, d)) 
                       }),
                       (c.p rototyp e.delet eLink =  functi on (o)  {
                           va r f = o .parent 
                           ret urn f ?  (f.del eteChil d(o), ! 0) : !1 
                       }),
                       (c.p rototyp e.newIn oNumber  = func tion ()  {
                           v ar o =  this.re leasedI nos.pop ()
                           r eturn o  || (th is.ino  = (this .ino +  1) % 42 9496729 5)
                       }),
                       (c .protot ype.new FdNumbe r = fun ction ( ) {
                            var o =  this.r eleased Fds.pop ()
                           r eturn t ypeof o  == "nu mber" ?  o : c. fd--
                       }), 
                       (c.prot otype.c reateNo de = fu nction  (o, f)  {
                           re turn o  === voi d 0 &&  (o = !1 ), (f =  new th is.prop s.Node( this.ne wInoNum ber(),  f)), o  && f.se tIsDire ctory() , (this .inodes [f.ino]  = f)
                       }) ,
                       (c.pro totype. getNode  = func tion (o ) {
                            return  this.in odes[o] 
                       }),
                       (c.p rototyp e.delet eNode =  functi on (o)  {
                           o. del(),  delete  this.in odes[o. ino], t his.rel easedIn os.push (o.ino) 
                       }),
                       (c.p rototyp e.genRn dStr =  functio n () {
                            var  o = (Ma th.rand om() +  1).toSt ring(36 ).subst r(2, 6) 
                           ret urn o.l ength = == 6 ?  o : thi s.genRn dStr()
                       } ),
                       (c.pr ototype .getLin k = fun ction ( o) {
                            return  this.r oot.wal k(o)
                       }), 
                       (c.prot otype.g etLinkO rThrow  = funct ion (o,  f) {
                            var h  = O(o) 
                           if  (((h =  this.ge tLink(h )), !h) ) throw  l("ENO ENT", f , o)
                            return  h
                       }),
                       (c .protot ype.get Resolve dLink =  functi on (o)  {
                           o  = typeo f o ==  "string " ? O(o ) : o
                            for ( var f =  this.r oot, h  = 0; h  < o.len gth; )  {
                                if (( (f = f. getChil d(o[h]) ), !f))  return  null
                                v ar d =  f.getNo de()
                                d. isSymli nk() ?  ((o = d .symlin k.conca t(o.sli ce(h +  1))), ( f = thi s.root) , (h =  0)) : h ++
                           } 
                           ret urn f
                       }) ,
                       (c.pro totype. getReso lvedLin kOrThro w = fun ction ( o, f) { 
                           var  h = th is.getR esolved Link(o) 
                           if  (!h) th row l(" ENOENT" , f, o) 
                           ret urn h
                       }) ,
                       (c.pro totype. resolve Symlink s = fun ction ( o) {
                            return  this.g etResol vedLink (o.step s.slice (1))
                       }), 
                       (c.prot otype.g etLinkA sDirOrT hrow =  functio n (o, f ) {
                            var h =  this.g etLinkO rThrow( o, f)
                            if (! h.getNo de().is Directo ry()) t hrow l( "ENOTDI R", f,  o)
                           r eturn h 
                       }),
                       (c.p rototyp e.getLi nkParen t = fun ction ( o) {
                            return  this.r oot.wal k(o, o. length  - 1)
                       }), 
                       (c.prot otype.g etLinkP arentAs DirOrTh row = f unction  (o, f)  {
                           o  = o in stanceo f Array  ? o :  O(o)
                            var h  = this. getLink Parent( o)
                           i f (!h)  throw l ("ENOEN T", f,  dt + o. join(dt ))
                           i f (!h.g etNode( ).isDir ectory( )) thro w l("EN OTDIR",  f, dt  + o.joi n(dt))
                            retu rn h
                       }), 
                       (c.prot otype.g etFileB yFd = f unction  (o) {
                            retu rn this .fds[St ring(o) ]
                       }),
                       (c. prototy pe.getF ileByFd OrThrow  = func tion (o , f) {
                            if ( o >>> 0  !== o)  throw  TypeErr or(Ft.F D)
                           i f (((o  = this. getFile ByFd(o) ), !o))  throw  l("EBAD F", f)
                            retu rn o
                       }), 
                       (c.prot otype.g etNodeB yIdOrCr eate =  functio n (o, f , h) {
                            if ( typeof  o == "n umber")  {
                                if ( ((o = t his.get FileByF d(o)),  !o)) th row Err or("Fil e nto f ound")
                                 return  o.node
                            }
                            var d  = \$(o), 
                                _ = th is.getL ink(d)
                            if ( _) retu rn _.ge tNode() 
                           if  (f & J  && (f =  this.g etLinkP arent(d ))) ret urn (_  = this. createL ink(f,  d[d.len gth - 1 ], !1,  h)), _. getNode ()
                           t hrow l( "ENOENT ", "get NodeByI dOrCrea te", w( o))
                       }),
                       ( c.proto type.wr apAsync  = func tion (o , f, h)  {
                           v ar d =  this
                            y(h),
                                 Oe.defa ult(fun ction ( ) {
                                     try {
                                          h(null , o.app ly(d, f ))
                                     } catch  (_) {
                                          h(_)
                                     }
                                }) 
                       }),
                       (c.p rototyp e._toJS ON = fu nction  (o, f,  h) {
                            var d
                            o == = void  0 && (o  = this .root),  f ===  void 0  && (f =  {})
                            var _  = !0,
                                N  = o.ch ildren
                            o.ge tNode() .isFile () && ( (N = (( d = {}) , (d[o. getName ()] = o .parent .getChi ld(o.ge tName() )), d)) , (o =  o.paren t))
                            for (va r K in  N) {
                                if  (((_ =  !1), ( N = o.g etChild (K)), ! N)) thr ow Erro r("_toJ SON: un expecte d undef ined")
                                 ;(d = N .getNod e()), d .isFile () ? (( N = N.g etPath( )), h & & (N =  Do(h, N )), (f[ N] = d. getStri ng()))  : d.isD irector y() &&  this._t oJSON(N , f, h) 
                           }
                            retur n (o =  o.getPa th()),  h && (o  = Do(h , o)),  o && _  && (f[o ] = nul l), f
                       }) ,
                       (c.pro totype. toJSON  = funct ion (o,  f, h)  {
                           f  === voi d 0 &&  (f = {} ), h == = void  0 && (h  = !1)
                            var  d = []
                            if ( o) {
                                o  instanc eof Arr ay || ( o = [o] )
                                for ( var _ =  0; _ <  o.leng th; _++ ) {
                                     var N  = w(o[_ ])
                                     ;(N = t his.get Resolve dLink(N )) && d .push(N )
                                }
                            } else  d.push( this.ro ot)
                            if (!d. length)  return  f
                           f or (_ =  0; _ <  d.leng th; _++ ) (N =  d[_]),  this._t oJSON(N , f, h  ? N.get Path()  : "")
                            retur n f
                       }),
                       ( c.proto type.fr omJSON  = funct ion (o,  f) {
                            f ===  void 0  && (f  = st.de fault.c wd())
                            for ( var h i n o) {
                                 var d =  o[h]
                                i f (type of d ==  "strin g") {
                                     h =  r(h, f) 
                                    va r _ = O (h)
                                     1 < _. length  && ((_  = dt +  _.slice (0, _.l ength -  1).joi n(dt)),  this.m kdirpBa se(_, 5 11)), t his.wri teFileS ync(h,  d)
                                } el se this .mkdirp Base(h,  511)
                            }
                       }),
                       ( c.proto type.re set = f unction  () {
                            ;(thi s.ino =  0), (t his.ino des = { }), (th is.rele asedIno s = []) , (this .fds =  {}), (t his.rel easedFd s = []) , (this .openFi les = 0 ), (thi s.root  = this. createL ink()),  this.r oot.set Node(th is.crea teNode( !0))
                       }), 
                       (c.prot otype.m ountSyn c = fun ction ( o, f) { 
                           thi s.fromJ SON(f,  o)
                       }),
                       (c .protot ype.ope nLink =  functi on (o,  f, h) { 
                           if  ((h ===  void 0  && (h  = !0),  this.op enFiles  >= thi s.maxFi les)) t hrow l( "EMFILE ", "ope n", o.g etPath( ))
                           v ar d =  o
                           if  ((h &&  (d = t his.res olveSym links(o )), !d) ) throw  l("ENO ENT", " open",  o.getPa th())
                            if (( (h = d. getNode ()), h. isDirec tory()) ) {
                                if  ((f & ( M | X |  W)) != = M) th row l(" EISDIR" , "open ", o.ge tPath() )
                           }  else if  (f & z u) thro w l("EN OTDIR",  "open" , o.get Path()) 
                           if  (!(f &  W || h. canRead ())) th row l(" EACCES" , "open ", o.ge tPath() )
                           re turn (o  = new  this.pr ops.Fil e(o, h,  f, thi s.newFd Number( ))), (t his.fds [o.fd]  = o), t his.ope nFiles+ +, f &  We && o .trunca te(), o 
                       }),
                       (c.p rototyp e.openF ile = f unction  (o, f,  h, d)  {
                           d  === voi d 0 &&  (d = !0 )
                           va r _ = O (o),
                                N  = d ? t his.get Resolve dLink(_ ) : thi s.getLi nk(_)
                            if (! N && f  & J) {
                                 var K =  this.g etResol vedLink (_.slic e(0, _. length  - 1))
                                i f (!K)  throw l ("ENOEN T", "op en", dt  + _.jo in(dt)) 
                                f & J  && type of h ==  "numbe r" && ( N = thi s.creat eLink(K , _[_.l ength -  1], !1 , h))
                            }
                            if (N)  return  this.op enLink( N, f, d )
                           th row l(" ENOENT" , "open ", o)
                       }) ,
                       (c.pro totype. openBas e = fun ction ( o, f, h , d) {
                            if ( (d ===  void 0  && (d =  !0), ( f = thi s.openF ile(o,  f, h, d )), !f) ) throw  l("ENO ENT", " open",  o)
                           r eturn f .fd
                       }),
                       ( c.proto type.op enSync  = funct ion (o,  f, h)  {
                           re turn h  === voi d 0 &&  (h = 43 8), (h  = rt(h) ), (o =  w(o)),  (f = g (f)), t his.ope nBase(o , f, h) 
                       }),
                       (c.p rototyp e.open  = funct ion (o,  f, h,  d) {
                            var _  = h
                            typeof  h == "f unction " && (( _ = 438 ), (d =  h)), ( h = rt( _ || 43 8)), (o  = w(o) ), (f =  g(f)),  this.w rapAsyn c(this. openBas e, [o,  f, h],  d)
                       }),
                       (c .protot ype.clo seFile  = funct ion (o)  {
                           t his.fds [o.fd]  && (thi s.openF iles--,  delete  this.f ds[o.fd ], this .releas edFds.p ush(o.f d))
                       }),
                       ( c.proto type.cl oseSync  = func tion (o ) {
                            qt(o),  (o = th is.getF ileByFd OrThrow (o, "cl ose")),  this.c loseFil e(o)
                       }), 
                       (c.prot otype.c lose =  functio n (o, f ) {
                            qt(o),  this.wr apAsync (this.c loseSyn c, [o],  f)
                       }),
                       ( c.proto type.op enFileO rGetByI d = fun ction ( o, f, h ) {
                            if (typ eof o = = "numb er") {
                                 if (((o  = this .fds[o] ), !o))  throw  l("ENOE NT")
                                re turn o
                            }
                            return  this.o penFile (w(o),  f, h)
                       }) ,
                       (c.pro totype. readBas e = fun ction ( o, f, h , d, _)  {
                           r eturn t his.get FileByF dOrThro w(o).re ad(f, N umber(h ), Numb er(d),  _)
                       }),
                       (c .protot ype.rea dSync =  functi on (o,  f, h, d , _) {
                            retu rn qt(o ), this .readBa se(o, f , h, d,  _)
                       }),
                       ( c.proto type.re ad = fu nction  (o, f,  h, d, _ , N) {
                            var  K = thi s
                           if  ((y(N) , d ===  0))
                                re turn st .defaul t.nextT ick(fun ction ( ) {
                                     N && N (null,  0, f)
                                } )
                           Oe .defaul t(funct ion ()  {
                                try { 
                                    va r ht =  K.readB ase(o,  f, h, d , _)
                                     N(nul l, ht,  f)
                                } ca tch (Kt ) {
                                     N(Kt)
                                 }
                           }) 
                       }),
                       (c.p rototyp e.readF ileBase  = func tion (o , f, h)  {
                           v ar d =  typeof  o == "n umber"  && o >> > 0 ===  o
                           i f (!d)  {
                                var _  = w(o) 
                                if ((( _ = O(_ )), (_  = this. getReso lvedLin k(_)) & & _.get Node(). isDirec tory()) ) throw  l("EIS DIR", " open",  _.getPa th())
                                o  = this .openSy nc(o, f )
                           }
                            try  {
                                var N  = Bt(t his.get FileByF dOrThro w(o).ge tBuffer (), h)
                            } fi nally { 
                                d || t his.clo seSync( o)
                           } 
                           ret urn N
                       }) ,
                       (c.pro totype. readFil eSync =  functi on (o,  f) {
                            f = xo (f)
                            var h =  g(f.fl ag)
                            return  this.re adFileB ase(o,  h, f.en coding) 
                       }),
                       (c.p rototyp e.readF ile = f unction  (o, f,  h) {
                            ;(h =  v(xo)( f, h)),  (f = h [0]), ( h = h[1 ])
                           v ar d =  g(f.fla g)
                           t his.wra pAsync( this.re adFileB ase, [o , d, f. encodin g], h)
                       } ),
                       (c.pr ototype .writeB ase = f unction  (o, f,  h, d,  _) {
                            return  this.g etFileB yFdOrTh row(o,  "write" ).write (f, h,  d, _)
                       }) ,
                       (c.pro totype. writeSy nc = fu nction  (o, f,  h, d, _ ) {
                            qt(o)
                            var N  = type of f !=  "strin g"
                           i f (N) { 
                                var K  = (h ||  0) | 0 ,
                                    h t = d
                                h  = _
                            } else  var Kt  = d
                            return  (f = T t(f, Kt )), N ?  typeof  ht > " u" && ( ht = f. length)  : ((K  = 0), ( ht = f. length) ), this .writeB ase(o,  f, K, h t, h)
                       }) ,
                       (c.pro totype. write =  functi on (o,  f, h, d , _, N)  {
                           v ar K =  this
                            qt(o)
                            var  ht = ty peof f, 
                                Kt = t ypeof h ,
                                Xo =  typeof  d,
                                Jo =  typeof  _
                           i f (ht ! == "str ing")
                                i f (Kt = == "fun ction")  var he  = h
                                el se if ( Xo ===  "functi on") {
                                     var  Sr = h  | 0
                                     he =  d
                                } els e if (J o === " functio n") {
                                     Sr =  h | 0
                                     var  ze = d 
                                    he  = _
                                }  else {
                                     ;(S r = h |  0), (z e = d)
                                     var  Nn = _ 
                                    he  = N
                                }
                            else  if (Kt  === "f unction ") he =  h
                           e lse if  (Xo ===  "funct ion") ( Nn = h) , (he =  d)
                            else if  (Jo == = "func tion")  {
                                Nn =  h
                                var b u = d
                                h e = _
                            }
                            var Rr  = Tt(f,  bu)
                            ht !==  "strin g" ? ty peof ze  > "u"  && (ze  = Rr.le ngth) :  ((Sr =  0), (z e = Rr. length) )
                           va r kn =  y(he)
                            Oe.de fault(f unction  () {
                                t ry {
                                     var Z o = K.w riteBas e(o, Rr , Sr, z e, Nn)
                                     ht  !== "st ring" ?  kn(nul l, Zo,  Rr) : k n(null,  Zo, f) 
                                } catc h (tf)  {
                                    k n(tf)
                                } 
                           })
                       } ),
                       (c.pr ototype .writeF ileBase  = func tion (o , f, h,  d) {
                            var _  = type of o ==  "numbe r"
                           ; (o = _  ? o : t his.ope nBase(w (o), h,  d)), ( d = 0)
                            var  N = f.l ength
                            h = h  & Ge ?  void 0  : 0
                            try {
                                 for (;  0 < N;  ) {
                                     var K  = this. writeSy nc(o, f , d, N,  h)
                                     ;(d +=  K), (N  -= K),  h !==  void 0  && (h + = K)
                                }
                            } fi nally { 
                                _ || t his.clo seSync( o)
                           } 
                       }),
                       (c.p rototyp e.write FileSyn c = fun ction ( o, f, h ) {
                            var d =  Yo(h)
                            h =  g(d.fla g)
                           v ar _ =  rt(d.mo de)
                            ;(f = T t(f, d. encodin g)), th is.writ eFileBa se(o, f , h, _) 
                       }),
                       (c.p rototyp e.write File =  functio n (o, f , h, d)  {
                           v ar _ =  h
                           ty peof h  == "fun ction"  && ((_  = jo),  (d = h) ), (h =  y(d))
                            var  N = Yo( _)
                           ; (_ = g( N.flag) ), (d =  rt(N.m ode)),  (f = Tt (f, N.e ncoding )), thi s.wrapA sync(th is.writ eFileBa se, [o,  f, _,  d], h)
                       } ),
                       (c.pr ototype .linkBa se = fu nction  (o, f)  {
                           va r h = O (o),
                                d  = this. getLink (h)
                            if (!d)  throw  l("ENOE NT", "l ink", o , f)
                            var _  = O(f)
                            if ( ((h = t his.get LinkPar ent(_)) , !h))  throw l ("ENOEN T", "li nk", o,  f)
                            if (((_  = _[_. length  - 1]),  h.getCh ild(_)) ) throw  l("EEX IST", " link",  o, f)
                            ;(o =  d.getN ode()),  o.nlin k++, h. createC hild(_,  o)
                       }),
                       ( c.proto type.co pyFileB ase = f unction  (o, f,  h) {
                            var d  = this .readFi leSync( o)
                           i f (h &  Vu && t his.exi stsSync (f)) th row l(" EEXIST" , "copy File",  o, f)
                            if (h  & qu)  throw l ("ENOSY S", "co pyFile" , o, f) 
                           thi s.write FileBas e(f, d,  fe.w,  438)
                       }), 
                       (c.prot otype.c opyFile Sync =  functio n (o, f , h) {
                            retu rn (o =  w(o)),  (f = w (f)), t his.cop yFileBa se(o, f , (h ||  0) | 0 )
                       }),
                       (c. prototy pe.copy File =  functio n (o, f , h, d)  {
                           i f (((o  = w(o)) , (f =  w(f)),  typeof  h == "f unction ")) var  _ = 0
                            else  (_ = h ), (h =  d)
                            y(h), t his.wra pAsync( this.co pyFileB ase, [o , f, _] , h)
                       }), 
                       (c.prot otype.l inkSync  = func tion (o , f) {
                            ;(o  = w(o)) , (f =  w(f)),  this.li nkBase( o, f)
                       }) ,
                       (c.pro totype. link =  functio n (o, f , h) {
                            ;(o  = w(o)) , (f =  w(f)),  this.wr apAsync (this.l inkBase , [o, f ], h)
                       }) ,
                       (c.pro totype. unlinkB ase = f unction  (o) {
                            var  f = O(o )
                           if  (((f =  this.g etLink( f)), !f )) thro w l("EN OENT",  "unlink ", o)
                            if (f .length ) throw  Error( "Dir no t empty ...")
                            this. deleteL ink(f),  (o = f .getNod e()), o .nlink- -, 0 >=  o.nlin k && th is.dele teNode( o)
                       }),
                       (c .protot ype.unl inkSync  = func tion (o ) {
                            ;(o = w (o)), t his.unl inkBase (o)
                       }),
                       ( c.proto type.un link =  functio n (o, f ) {
                            ;(o = w (o)), t his.wra pAsync( this.un linkBas e, [o],  f)
                       }),
                       ( c.proto type.sy mlinkBa se = fu nction  (o, f)  {
                           va r h = O (f),
                                d  = this. getLink Parent( h)
                           i f (!d)  throw l ("ENOEN T", "sy mlink",  o, f)
                            if ( ((h = h [h.leng th - 1] ), d.ge tChild( h))) th row l(" EEXIST" , "syml ink", o , f)
                            return  (f = d .create Child(h )), f.g etNode( ).makeS ymlink( O(o)),  f
                       }),
                       (c. prototy pe.syml inkSync  = func tion (o , f) {
                            ;(o  = w(o)) , (f =  w(f)),  this.sy mlinkBa se(o, f )
                       }),
                       (c. prototy pe.syml ink = f unction  (o, f,  h, d)  {
                           ;( h = y(t ypeof h  == "fu nction"  ? h :  d)), (o  = w(o) ), (f =  w(f)),  this.w rapAsyn c(this. symlink Base, [ o, f],  h)
                       }),
                       (c .protot ype.rea lpathBa se = fu nction  (o, f)  {
                           va r h = O (o)
                            if (((h  = this .getRes olvedLi nk(h)),  !h)) t hrow l( "ENOENT ", "rea lpath",  o)
                            return  pt.strT oEncodi ng(h.ge tPath() , f)
                       }), 
                       (c.prot otype.r ealpath Sync =  functio n (o, f ) {
                            return  this.re alpathB ase(w(o ), Go(f ).encod ing)
                       }), 
                       (c.prot otype.r ealpath  = func tion (o , f, h)  {
                           ; (h = Hu (f, h)) , (f =  h[0]),  (h = h[ 1]), (o  = w(o) ), this .wrapAs ync(thi s.realp athBase , [o, f .encodi ng], h) 
                       }),
                       (c.p rototyp e.lstat Base =  functio n (o, f ) {
                            f === v oid 0 & & (f =  !1)
                            var h =  this.g etLink( O(o))
                            if (! h) thro w l("EN OENT",  "lstat" , o)
                            return  ve.def ault.bu ild(h.g etNode( ), f)
                       }) ,
                       (c.pro totype. lstatSy nc = fu nction  (o, f)  {
                           re turn th is.lsta tBase(w (o), i( f).bigi nt)
                       }),
                       ( c.proto type.ls tat = f unction  (o, f,  h) {
                            ;(h =  n(f, h )), (f  = h[0]) , (h =  h[1]),  this.wr apAsync (this.l statBas e, [w(o ), f.bi gint],  h)
                       }),
                       (c .protot ype.sta tBase =  functi on (o,  f) {
                            f ===  void 0  && (f =  !1)
                            var h  = this. getReso lvedLin k(O(o)) 
                           if  (!h) th row l(" ENOENT" , "stat ", o)
                            retur n ve.de fault.b uild(h. getNode (), f)
                       } ),
                       (c.pr ototype .statSy nc = fu nction  (o, f)  {
                           re turn th is.stat Base(w( o), i(f ).bigin t)
                       }),
                       (c .protot ype.sta t = fun ction ( o, f, h ) {
                            ;(h = n (f, h)) , (f =  h[0]),  (h = h[ 1]), th is.wrap Async(t his.sta tBase,  [w(o),  f.bigin t], h)
                       } ),
                       (c.pr ototype .fstatB ase = f unction  (o, f)  {
                           i f ((f = == void  0 && ( f = !1) , (o =  this.ge tFileBy Fd(o)),  !o)) t hrow l( "EBADF" , "fsta t")
                            return  ve.defa ult.bui ld(o.no de, f)
                       } ),
                       (c.pr ototype .fstatS ync = f unction  (o, f)  {
                           r eturn t his.fst atBase( o, i(f) .bigint )
                       }),
                       (c. prototy pe.fsta t = fun ction ( o, f, h ) {
                            ;(f = n (f, h)) , this. wrapAsy nc(this .fstatB ase, [o , f[0]. bigint] , f[1]) 
                       }),
                       (c.p rototyp e.renam eBase =  functi on (o,  f) {
                            var h  = this. getLink (O(o))
                            if ( !h) thr ow l("E NOENT",  "renam e", o,  f)
                           v ar d =  O(f),
                                _  = this .getLin kParent (d)
                            if (!_)  throw  l("ENOE NT", "r ename",  o, f)
                            ;(o  = h.par ent) &&  o.dele teChild (h), (h .steps  = B(_.s teps, [ d[d.len gth - 1 ]])), _ .setChi ld(h.ge tName() , h)
                       }), 
                       (c.prot otype.r enameSy nc = fu nction  (o, f)  {
                           ;( o = w(o )), (f  = w(f)) , this. renameB ase(o,  f)
                       }),
                       (c .protot ype.ren ame = f unction  (o, f,  h) {
                            ;(o =  w(o)),  (f = w (f)), t his.wra pAsync( this.re nameBas e, [o,  f], h)
                       } ),
                       (c.pr ototype .exists Base =  functio n (o) { 
                           ret urn !!t his.sta tBase(o )
                       }),
                       (c. prototy pe.exis tsSync  = funct ion (o)  {
                           t ry {
                                re turn th is.exis tsBase( w(o))
                            } cat ch {
                                re turn !1 
                           }
                       }) ,
                       (c.pro totype. exists  = funct ion (o,  f) {
                            var h  = this ,
                                d = w (o)
                            if (typ eof f ! = "func tion")  throw E rror(Ft .CB)
                            Oe.def ault(fu nction  () {
                                tr y {
                                     f(h.ex istsBas e(d))
                                }  catch  {
                                    f (!1)
                                }
                            })
                       }) ,
                       (c.pro totype. accessB ase = f unction  (o) {
                            this .getLin kOrThro w(o, "a ccess") 
                       }),
                       (c.p rototyp e.acces sSync =  functi on (o,  f) {
                            f ===  void 0  && (f =  Uo), ( o = w(o )), thi s.acces sBase(o , f | 0 )
                       }),
                       (c. prototy pe.acce ss = fu nction  (o, f,  h) {
                            var d  = Uo
                            typeof  f != " functio n" && ( (d = f  | 0), ( f = y(h ))), (o  = w(o) ), this .wrapAs ync(thi s.acces sBase,  [o, d],  f)
                       }),
                       ( c.proto type.ap pendFil eSync =  functi on (o,  f, h) { 
                           h = == void  0 && ( h = \$o) , (h =  Wo(h)),  (h.fla g && o  >>> 0 ! == o) | | (h.fl ag = "a "), thi s.write FileSyn c(o, f,  h)
                       }),
                       ( c.proto type.ap pendFil e = fun ction ( o, f, h , d) {
                            ;(d  = Ku(h,  d)), ( h = d[0 ]), (d  = d[1]) , (h.fl ag && o  >>> 0  !== o)  || (h.f lag = " a"), th is.writ eFile(o , f, h,  d)
                       }),
                       ( c.proto type.re addirBa se = fu nction  (o, f)  {
                           va r h = O (o)
                            if (((h  = this .getRes olvedLi nk(h)),  !h)) t hrow l( "ENOENT ", "rea ddir",  o)
                           i f (!h.g etNode( ).isDir ectory( )) thro w l("EN OTDIR",  "scand ir", o) 
                           if  (f.with FileTyp es) {
                                v ar d =  []
                                for  (_ in h .childr en) (o  = h.get Child(_ )) && d .push(l n.defau lt.buil d(o, f. encodin g))
                                ret urn (
                                     In | |
                                         f.en coding  === "bu ffer" | |
                                         d.so rt(func tion (N , K) {
                                              re turn N. name <  K.name  ? -1 :  N.name  > K.nam e ? 1 :  0
                                         }), 
                                    d
                                 )
                           }
                            var  _ = []
                            for  (d in h .childr en) _.p ush(pt. strToEn coding( d, f.en coding) )
                           re turn In  || f.e ncoding  === "b uffer"  || _.so rt(), _ 
                       }),
                       (c.p rototyp e.readd irSync  = funct ion (o,  f) {
                            retur n (f =  qo(f)),  (o = w (o)), t his.rea ddirBas e(o, f) 
                       }),
                       (c.p rototyp e.readd ir = fu nction  (o, f,  h) {
                            ;(h =  Xu(f, h )), (f  = h[0]) , (h =  h[1]),  (o = w( o)), th is.wrap Async(t his.rea ddirBas e, [o,  f], h)
                       } ),
                       (c.pr ototype .readli nkBase  = funct ion (o,  f) {
                            var h  = this .getLin kOrThro w(o, "r eadlink ").getN ode()
                            if (! h.isSym link())  throw  l("EINV AL", "r eadlink ", o)
                            retur n (o =  dt + h. symlink .join(d t)), pt .strToE ncoding (o, f)
                       } ),
                       (c.pr ototype .readli nkSync  = funct ion (o,  f) {
                            retur n (f =  _r(f)),  (o = w (o)), t his.rea dlinkBa se(o, f .encodi ng)
                       }),
                       ( c.proto type.re adlink  = funct ion (o,  f, h)  {
                           ;( h = Mo( f, h)),  (f = h [0]), ( h = h[1 ]), (o  = w(o)) , this. wrapAsy nc(this .readli nkBase,  [o, f. encodin g], h)
                       } ),
                       (c.pr ototype .fsyncB ase = f unction  (o) {
                            this .getFil eByFdOr Throw(o , "fsyn c")
                       }),
                       ( c.proto type.fs yncSync  = func tion (o ) {
                            this.fs yncBase (o)
                       }),
                       ( c.proto type.fs ync = f unction  (o, f)  {
                           t his.wra pAsync( this.fs yncBase , [o],  f)
                       }),
                       (c .protot ype.fda tasyncB ase = f unction  (o) {
                            this .getFil eByFdOr Throw(o , "fdat async") 
                       }),
                       (c.p rototyp e.fdata syncSyn c = fun ction ( o) {
                            this.f datasyn cBase(o )
                       }),
                       (c. prototy pe.fdat async =  functi on (o,  f) {
                            this.w rapAsyn c(this. fdatasy ncBase,  [o], f )
                       }),
                       (c. prototy pe.ftru ncateBa se = fu nction  (o, f)  {
                           th is.getF ileByFd OrThrow (o, "ft runcate ").trun cate(f) 
                       }),
                       (c.p rototyp e.ftrun cateSyn c = fun ction ( o, f) { 
                           thi s.ftrun cateBas e(o, f) 
                       }),
                       (c.p rototyp e.ftrun cate =  functio n (o, f , h) {
                            var  d = typ eof f = = "numb er" ? f  : 0
                            ;(f =  y(typeo f f ==  "number " ? h :  f)), t his.wra pAsync( this.ft runcate Base, [ o, d],  f)
                       }),
                       (c .protot ype.tru ncateBa se = fu nction  (o, f)  {
                           o  = this. openSyn c(o, "r +")
                            try {
                                t his.ftr uncateS ync(o,  f)
                           }  finall y {
                                thi s.close Sync(o) 
                           }
                       }) ,
                       (c.pro totype. truncat eSync =  functi on (o,  f) {
                            if (o  >>> 0 = == o) r eturn t his.ftr uncateS ync(o,  f)
                           t his.tru ncateBa se(o, f )
                       }),
                       (c. prototy pe.trun cate =  functio n (o, f , h) {
                            var  d = typ eof f = = "numb er" ? f  : 0
                            if ((( f = y(t ypeof f  == "nu mber" ?  h : f) ), o >> > 0 ===  o)) re turn th is.ftru ncate(o , d, f) 
                           thi s.wrapA sync(th is.trun cateBas e, [o,  d], f)
                       } ),
                       (c.pr ototype .futime sBase =  functi on (o,  f, h) { 
                           ;(o  = this .getFil eByFdOr Throw(o , "futi mes").n ode), ( o.atime  = new  Date(1e 3 * f)) , (o.mt ime = n ew Date (1e3 *  h))
                       }),
                       ( c.proto type.fu timesSy nc = fu nction  (o, f,  h) {
                            this.f utimesB ase(o,  gt(f),  gt(h))
                       } ),
                       (c.pr ototype .futime s = fun ction ( o, f, h , d) {
                            this .wrapAs ync(thi s.futim esBase,  [o, gt (f), gt (h)], d )
                       }),
                       (c. prototy pe.utim esBase  = funct ion (o,  f, h)  {
                           o  = this. openSyn c(o, "r +")
                            try {
                                t his.fut imesBas e(o, f,  h)
                            } final ly {
                                th is.clos eSync(o )
                           }
                       } ),
                       (c.pr ototype .utimes Sync =  functio n (o, f , h) {
                            this .utimes Base(w( o), gt( f), gt( h))
                       }),
                       ( c.proto type.ut imes =  functio n (o, f , h, d)  {
                           t his.wra pAsync( this.ut imesBas e, [w(o ), gt(f ), gt(h )], d)
                       } ),
                       (c.pr ototype .mkdirB ase = f unction  (o, f)  {
                           v ar h =  O(o)
                            if (!h .length ) throw  l("EIS DIR", " mkdir",  o)
                            var d =  this.g etLinkP arentAs DirOrTh row(o,  "mkdir" )
                           if  (((h =  h[h.le ngth -  1]), d. getChil d(h)))  throw l ("EEXIS T", "mk dir", o )
                           d. createC hild(h,  this.c reateNo de(!0,  f))
                       }),
                       ( c.proto type.mk dirpBas e = fun ction ( o, f) { 
                           o =  O(o)
                            for ( var h =  this.r oot, d  = 0; d  < o.len gth; d+ +) {
                                va r _ = o [d]
                                if  (!h.get Node(). isDirec tory())  throw  l("ENOT DIR", " mkdir",  h.getP ath())
                                 var N =  h.getC hild(_) 
                                if (N) 
                                    if  (N.get Node(). isDirec tory())  h = N
                                     els e throw  l("ENO TDIR",  "mkdir" , N.get Path()) 
                                else h  = h.cr eateChi ld(_, t his.cre ateNode (!0, f) )
                           }
                       } ),
                       (c.pr ototype .mkdirS ync = f unction  (o, f)  {
                           f  = s(f) 
                           var  h = rt (f.mode , 511)
                            ;(o  = w(o)) , f.rec ursive  ? this. mkdirpB ase(o,  h) : th is.mkdi rBase(o , h)
                       }), 
                       (c.prot otype.m kdir =  functio n (o, f , h) {
                            var  d = s(f )
                           ;( f = y(t ypeof f  == "fu nction"  ? f :  h)), (h  = rt(d .mode,  511)),  (o = w( o)), d. recursi ve ? th is.wrap Async(t his.mkd irpBase , [o, h ], f) :  this.w rapAsyn c(this. mkdirBa se, [o,  h], f) 
                       }),
                       (c.p rototyp e.mkdir pSync =  functi on (o,  f) {
                            this.m kdirSyn c(o, {  mode: f , recur sive: ! 0 })
                       }), 
                       (c.prot otype.m kdirp =  functi on (o,  f, h) { 
                           var  d = ty peof f  == "fun ction"  ? void  0 : f
                            ;(f =  y(type of f ==  "funct ion" ?  f : h)) , this. mkdir(o , { mod e: d, r ecursiv e: !0 } , f)
                       }), 
                       (c.prot otype.m kdtempB ase = f unction  (o, f,  h) {
                            h ===  void 0  && (h  = 5)
                            var d  = o + t his.gen RndStr( )
                           tr y {
                                ret urn thi s.mkdir Base(d,  511),  pt.strT oEncodi ng(d, f )
                           }  catch ( _) {
                                if  (_.cod e === " EEXIST" ) {
                                     if (1  < h) re turn th is.mkdt empBase (o, f,  h - 1)
                                     thr ow Erro r("Coul d not c reate t emp dir .")
                                }
                                t hrow _
                            }
                       }), 
                       (c.prot otype.m kdtempS ync = f unction  (o, f)  {
                           i f (((f  = _r(f) .encodi ng), !o  || typ eof o ! = "stri ng")) t hrow ne w TypeE rror("f ilename  prefix  is req uired") 
                           ret urn ue( o), thi s.mkdte mpBase( o, f)
                       }) ,
                       (c.pro totype. mkdtemp  = func tion (o , f, h)  {
                           i f (((h  = Mo(f,  h)), ( f = h[0 ].encod ing), ( h = h[1 ]), !o  || type of o !=  "strin g")) th row new  TypeEr ror("fi lename  prefix  is requ ired")
                            ue(o ) && th is.wrap Async(t his.mkd tempBas e, [o,  f], h)
                       } ),
                       (c.pr ototype .rmdirB ase = f unction  (o, f)  {
                           f  = P({} , Vo, f )
                           va r h = t his.get LinkAsD irOrThr ow(o, " rmdir") 
                           if  (h.leng th && ! f.recur sive) t hrow l( "ENOTEM PTY", " rmdir",  o)
                            this.de leteLin k(h)
                       }), 
                       (c.prot otype.r mdirSyn c = fun ction ( o, f) { 
                           thi s.rmdir Base(w( o), f)
                       } ),
                       (c.pr ototype .rmdir  = funct ion (o,  f, h)  {
                           va r d = P ({}, Vo , f)
                            ;(f =  y(typeo f f ==  "functi on" ? f  : h)),  this.w rapAsyn c(this. rmdirBa se, [w( o), d],  f)
                       }),
                       ( c.proto type.fc hmodBas e = fun ction ( o, f) { 
                           thi s.getFi leByFdO rThrow( o, "fch mod").c hmod(f) 
                       }),
                       (c.p rototyp e.fchmo dSync =  functi on (o,  f) {
                            this.f chmodBa se(o, r t(f))
                       }) ,
                       (c.pro totype. fchmod  = funct ion (o,  f, h)  {
                           th is.wrap Async(t his.fch modBase , [o, r t(f)],  h)
                       }),
                       (c .protot ype.chm odBase  = funct ion (o,  f) {
                            o = t his.ope nSync(o , "r+") 
                           try  {
                                this .fchmod Base(o,  f)
                            } final ly {
                                th is.clos eSync(o )
                           }
                       } ),
                       (c.pr ototype .chmodS ync = f unction  (o, f)  {
                           ; (f = rt (f)), ( o = w(o )), thi s.chmod Base(o,  f)
                       }),
                       ( c.proto type.ch mod = f unction  (o, f,  h) {
                            ;(f =  rt(f)) , (o =  w(o)),  this.wr apAsync (this.c hmodBas e, [o,  f], h)
                       } ),
                       (c.pr ototype .lchmod Base =  functio n (o, f ) {
                            o = thi s.openB ase(o,  X, 0, ! 1)
                           t ry {
                                th is.fchm odBase( o, f)
                            } fin ally {
                                 this.cl oseSync (o)
                            }
                       }),
                       (c. prototy pe.lchm odSync  = funct ion (o,  f) {
                            ;(f =  rt(f)) , (o =  w(o)),  this.lc hmodBas e(o, f) 
                       }),
                       (c.p rototyp e.lchmo d = fun ction ( o, f, h ) {
                            ;(f = r t(f)),  (o = w( o)), th is.wrap Async(t his.lch modBase , [o, f ], h)
                       }) ,
                       (c.pro totype. fchownB ase = f unction  (o, f,  h) {
                            this. getFile ByFdOrT hrow(o,  "fchow n").cho wn(f, h )
                       }),
                       (c. prototy pe.fcho wnSync  = funct ion (o,  f, h)  {
                           m( f), E(h ), this .fchown Base(o,  f, h)
                       } ),
                       (c.pr ototype .fchown  = func tion (o , f, h,  d) {
                            m(f),  E(h),  this.wr apAsync (this.f chownBa se, [o,  f, h],  d)
                       }),
                       ( c.proto type.ch ownBase  = func tion (o , f, h)  {
                           t his.get Resolve dLinkOr Throw(o , "chow n").get Node(). chown(f , h)
                       }), 
                       (c.prot otype.c hownSyn c = fun ction ( o, f, h ) {
                            m(f), E (h), th is.chow nBase(w (o), f,  h)
                       }),
                       ( c.proto type.ch own = f unction  (o, f,  h, d)  {
                           m( f), E(h ), this .wrapAs ync(thi s.chown Base, [ w(o), f , h], d )
                       }),
                       (c. prototy pe.lcho wnBase  = funct ion (o,  f, h)  {
                           th is.getL inkOrTh row(o,  "lchown ").getN ode().c hown(f,  h)
                       }),
                       ( c.proto type.lc hownSyn c = fun ction ( o, f, h ) {
                            m(f), E (h), th is.lcho wnBase( w(o), f , h)
                       }), 
                       (c.prot otype.l chown =  functi on (o,  f, h, d ) {
                            m(f), E (h), th is.wrap Async(t his.lch ownBase , [w(o) , f, h] , d)
                       }), 
                       (c.prot otype.w atchFil e = fun ction ( o, f, h ) {
                            o = w(o )
                           va r d = f 
                           if  ((typeo f d ==  "functi on" &&  ((h = f ), (d =  null)) , typeo f h !=  "functi on")) t hrow Er ror('"w atchFil e()" re quires  a liste ner fun ction') 
                           f =  5007
                            var _  = !0
                            retur n d &&  typeof  d == "o bject"  && (typ eof d.i nterval  == "nu mber" & & (f =  d.inter val), t ypeof d .persis tent ==  "boole an" &&  (_ = d. persist ent)),  (d = th is.stat Watcher s[o]),  d || (( d = new  this.S tatWatc her()),  d.star t(o, _,  f), (t his.sta tWatche rs[o] =  d)), d .addLis tener(" change" , h), d 
                       }),
                       (c.p rototyp e.unwat chFile  = funct ion (o,  f) {
                            o = w (o)
                            var h =  this.s tatWatc hers[o] 
                           h & & (type of f ==  "funct ion" ?  h.remov eListen er("cha nge", f ) : h.r emoveAl lListen ers("ch ange"),  h.list enerCou nt("cha nge") = == 0 &&  (h.sto p(), de lete th is.stat Watcher s[o]))
                       } ),
                       (c.pr ototype .create ReadStr eam = f unction  (o, f)  {
                           r eturn n ew this .ReadSt ream(o,  f)
                       }),
                       ( c.proto type.cr eateWri teStrea m = fun ction ( o, f) { 
                           ret urn new  this.W riteStr eam(o,  f)
                       }),
                       (c .protot ype.wat ch = fu nction  (o, f,  h) {
                            o = w( o)
                           v ar d =  f
                           ty peof f  == "fun ction"  && ((h  = f), ( d = nul l))
                            var _ =  _r(d)
                            ;(f  = _.per sistent ), (d =  _.recu rsive),  (_ = _ .encodi ng), f  === voi d 0 &&  (f = !0 ), d == = void  0 && (d  = !1)
                            var  N = new  this.F SWatche r()
                            return  N.start (o, f,  d, _),  h && N. addList ener("c hange",  h), N
                       } ),
                       (c.fd  = 2147 483647) ,
                       c
                  )
              }) ()),
              (e.V olume =  t)
         va r Ko =  (functi on (c)  {
              functio n o(f)  {
                  var  h = c. call(th is) ||  this
                   return  (
                       (h.onI nterval  = func tion ()  {
                           t ry {
                                va r d = h .vol.st atSync( h.filen ame)
                                h. hasChan ged(d)  && (h.e mit("ch ange",  d, h.pr ev), (h .prev =  d))
                            } fina lly {
                                h .loop() 
                           }
                       }) ,
                       (h.vol  = f),
                       h 
                  )
              }
              retu rn (
                   C(o, c) ,
                  (o. prototy pe.loop  = func tion ()  {
                       this. timeout Ref = t his.set Timeout (this.o nInterv al, thi s.inter val)
                   }),
                  ( o.proto type.ha sChange d = fun ction ( f) {
                       ret urn f.m timeMs  > this. prev.mt imeMs | | f.nli nk !==  this.pr ev.nlin k
                  }), 
                  (o.p rototyp e.start  = func tion (f , h, d)  {
                       h ===  void 0  && (h  = !0),  d === v oid 0 & & (d =  5007),  (this.f ilename  = w(f) ), (thi s.setTi meout =  h ? se tTimeou t : io. default ), (thi s.inter val = d ), (thi s.prev  = this. vol.sta tSync(t his.fil ename)) , this. loop()
                   }),
                   (o.pro totype. stop =  functio n () {
                       c learTim eout(th is.time outRef) , st.de fault.n extTick (A, thi s)
                  }) ,
                  o
              )
          })(U.Ev entEmit ter)
         e .StatWa tcher =  Ko
         va r yt
         U e.inher its(I,  ft.Read able),
              (e .ReadSt ream =  I),
              (I.pr ototype .open =  functi on () { 
                  var  c = thi s
                  thi s._vol. open(th is.path , this. flags,  this.mo de, fun ction ( o, f) { 
                       o ? (c. autoClo se && c .destro y && c. destroy (), c.e mit("er ror", o )) : (( c.fd =  f), c.e mit("op en", f) , c.rea d())
                   })
              }),
              (I.p rototyp e._read  = func tion (c ) {
                  i f (type of this .fd !=  "number ")
                       retur n this. once("o pen", f unction  () {
                            this. _read(c )
                       })
                  i f (!thi s.destr oyed) { 
                       ;(!yt | | 128 >  yt.len gth - y t.used)  && ((y t = G.b ufferAl locUnsa fe(this ._reada bleStat e.highW aterMar k)), (y t.used  = 0))
                       va r o = y t,
                           f  = Math .min(yt .length  - yt.u sed, c) ,
                           h  = yt.us ed
                       if (( this.po s !== v oid 0 & & (f =  Math.mi n(this. end - t his.pos  + 1, f )), 0 > = f)) r eturn t his.pus h(null) 
                       var d =  this
                       th is._vol .read(t his.fd,  yt, yt .used,  f, this .pos, f unction  (_, N)  {
                           _  ? (d.a utoClos e && d. destroy  && d.d estroy( ), d.em it("err or", _) ) : ((_  = null ), 0 <  N && (( d.bytes Read +=  N), (_  = o.sl ice(h,  h + N)) ), d.pu sh(_))
                       } ),
                           t his.pos  !== vo id 0 &&  (this. pos +=  f),
                            (yt.use d += f) 
                  }
              }),
              (I .protot ype._de stroy =  functi on (c,  o) {
                   this.cl ose(fun ction ( f) {
                       o(c  || f)
                   })
              }),
              (I .protot ype.clo se = fu nction  (c) {
                   var o  = this
                   if (( c && th is.once ("close ", c),  this.cl osed ||  typeof  this.f d != "n umber") ) {
                       if ( typeof  this.fd  != "nu mber")  {
                           th is.once ("open" , k)
                            return 
                       }
                       return  st.def ault.ne xtTick( functio n () {
                            retu rn o.em it("clo se")
                       })
                   }
                  ; (this.c losed =  !0),
                       th is._vol .close( this.fd , funct ion (f)  {
                           f  ? o.em it("err or", f)  : o.em it("clo se")
                       }), 
                       (this.f d = nul l)
              }),
              Ue.i nherits (L, ft. Writabl e),
              (e.Wr iteStre am = L) ,
              (L.prot otype.o pen = f unction  () {
                   this._ vol.ope n(
                       this. path,
                       th is.flag s,
                       this. mode,
                       fu nction  (c, o)  {
                           c  ? (this .autoCl ose &&  this.de stroy & & this. destroy (), thi s.emit( "error" , c)) :  ((this .fd = o ), this .emit(" open",  o))
                       }.bi nd(this )
                  )
              }), 
             ( L.proto type._w rite =  functio n (c, o , f) {
                   if (! (c inst anceof  G.Buffe r)) ret urn thi s.emit( "error" , Error ("Inval id data "))
                  i f (type of this .fd !=  "number ")
                       retur n this. once("o pen", f unction  () {
                            this. _write( c, o, f )
                       })
                  v ar h =  this
                   this._v ol.writ e(this. fd, c,  0, c.le ngth, t his.pos , funct ion (d,  _) {
                       if  (d) re turn h. autoClo se && h .destro y && h. destroy (), f(d )
                       ;(h.by tesWrit ten +=  _), f() 
                  }),
                       t his.pos  !== vo id 0 &&  (this. pos +=  c.lengt h)
              }),
              (L.p rototyp e._writ ev = fu nction  (c, o)  {
                  if  (typeof  this.f d != "n umber") 
                       return  this.on ce("ope n", fun ction ( ) {
                            this._w ritev(c , o)
                       })
                   for ( var f =  this,  h = c.l ength,  d = Arr ay(h),  _ = 0,  N = 0;  N < h;  N++) {
                       v ar K =  c[N].ch unk
                       ;(d[ N] = K) , (_ +=  K.leng th)
                  } 
                  ;(h  = G.Buf fer.con cat(d)) ,
                       this._ vol.wri te(this .fd, h,  0, h.l ength,  this.po s, func tion (h t, Kt)  {
                           if  (ht) r eturn f .destro y && f. destroy (), o(h t)
                           ; (f.byte sWritte n += Kt ), o()
                       } ),
                       this. pos !==  void 0  && (th is.pos  += _)
              }), 
             ( L.proto type._d estroy  = I.pro totype. _destro y),
              (L.pr ototype .close  = I.pro totype. close), 
             ( L.proto type.de stroySo on = L. prototy pe.end) 
         var H o = (fu nction  (c) {
              fun ction o (f) {
                   var h  = c.cal l(this)  || thi s
                  ret urn (
                       (h ._filen ame = " "),
                       (h._ filenam eEncode d = "") ,
                       (h._re cursive  = !1), 
                       (h._enc oding =  pt.ENC ODING_U TF8),
                       (h ._onNod eChange  = func tion ()  {
                           h ._emit( "change ")
                       }),
                       (h ._onPar entChil d = fun ction ( d) {
                            d.getN ame() = == h._g etName( ) && h. _emit(" rename" )
                       }),
                       (h. _emit =  functi on (d)  {
                           h. emit("c hange",  d, h._ filenam eEncode d)
                       }),
                       (h ._persi st = fu nction  () {
                            h._tim er = se tTimeou t(h._pe rsist,  1e6)
                       }), 
                       (h._vol  = f),
                       h 
                  )
              }
              retu rn (
                   C(o, c) ,
                  (o. prototy pe._get Name =  functio n () {
                       r eturn t his._st eps[thi s._step s.lengt h - 1]
                   }),
                   (o.pro totype. start =  functi on (f,  h, d, _ ) {
                       h == = void  0 && (h  = !0),  d ===  void 0  && (d =  !1), _  === vo id 0 &&  (_ = p t.ENCOD ING_UTF 8), (th is._fil ename =  w(f)),  (this. _steps  = O(thi s._file name)),  (this. _filena meEncod ed = pt .strToE ncoding (this._ filenam e)), (t his._re cursive  = d),  (this._ encodin g = _)
                       t ry {
                            this._ link =  this._v ol.getL inkOrTh row(thi s._file name, " FSWatch er")
                       } c atch (N ) {
                            throw ( (h = Er ror("wa tch " +  this._ filenam e + " "  + N.co de)), ( h.code  = N.cod e), (h. errno =  N.code ), h)
                       }
                       t his._li nk.getN ode().o n("chan ge", th is._onN odeChan ge), th is._lin k.on("c hild:ad d", thi s._onNo deChang e), thi s._link .on("ch ild:del ete", t his._on NodeCha nge), ( f = thi s._link .parent ) && (f .setMax Listene rs(f.ge tMaxLis teners( ) + 1),  f.on(" child:d elete",  this._ onParen tChild) ), h &&  this._ persist ()
                  }) ,
                  (o. prototy pe.clos e = fun ction ( ) {
                       clea rTimeou t(this. _timer) , this. _link.g etNode( ).remov eListen er("cha nge", t his._on NodeCha nge)
                       var  f = th is._lin k.paren t
                       f && f .remove Listene r("chil d:delet e", thi s._onPa rentChi ld)
                  } ),
                  o
              )
          })(U.E ventEmi tter)
          e.FSWat cher =  Ho
     })
     et(se)
     var  Yu = s e.pathT oFilena me,
         \$u  = se.f ilename ToSteps ,
         Po =  se.Vol ume,
         T n = b(f unction  (t, e)  {
              Object .define Propert y(e, "_ _esModu le", {  value:  !0 }),  (e.fsPr ops = " constan ts F_OK  R_OK W _OK X_O K Stats ".split (" ")),  (e.fsS yncMeth ods = " renameS ync ftr uncateS ync tru ncateSy nc chow nSync f chownSy nc lcho wnSync  chmodSy nc fchm odSync  lchmodS ync sta tSync l statSyn c fstat Sync li nkSync  symlink Sync re adlinkS ync rea lpathSy nc unli nkSync  rmdirSy nc mkdi rSync m kdirpSy nc read dirSync  closeS ync ope nSync u timesSy nc futi mesSync  fsyncS ync wri teSync  readSyn c readF ileSync  writeF ileSync  append FileSyn c exist sSync a ccessSy nc fdat asyncSy nc mkdt empSync  copyFi leSync  createR eadStre am crea teWrite Stream" .split( " ")),  (e.fsAs yncMeth ods = " rename  ftrunca te trun cate ch own fch own lch own chm od fchm od lchm od stat  lstat  fstat l ink sym link re adlink  realpat h unlin k rmdir  mkdir  mkdirp  readdir  close  open ut imes fu times f sync wr ite rea d readF ile wri teFile  appendF ile exi sts acc ess fda tasync  mkdtemp  copyFi le watc hFile u nwatchF ile wat ch".spl it(" ") )
         })
     et(T n)
     var Co  = b(fun ction ( t, e) { 
         funct ion r(a ) {
              for ( var y =  { F_OK : u, R_ OK: l,  W_OK: g , X_OK:  p, con stants:  F.cons tants,  Stats:  ve.defa ult, Di rent: l n.defau lt }, v  = 0, w  = i; v  < w.le ngth; v ++) {
                   var O  = w[v]
                   typeo f a[O]  == "fun ction"  && (y[O ] = a[O ].bind( a))
              }
              for ( v = 0,  w = s;  v < w.l ength;  v++) (O  = w[v] ), type of a[O]  == "fu nction"  && (y[ O] = a[ O].bind (a))
              retu rn (y.S tatWatc her = a .StatWa tcher),  (y.FSW atcher  = a.FSW atcher) , (y.Wr iteStre am = a. WriteSt ream),  (y.Read Stream  = a.Rea dStream ), (y.p romises  = a.pr omises) , (y._t oUnixTi mestamp  = se.t oUnixTi mestamp ), y
         } 
         var n  =
              (H &&  H.__ass ign) || 
             f unction  () {
                   return  (
                       (n =
                            Obje ct.assi gn ||
                            funct ion (a)  {
                                for  (var y,  v = 1,  w = ar guments .length ; v < w ; v++)  {
                                    y  = argu ments[v ]
                                    f or (var  O in y ) Objec t.proto type.ha sOwnPro perty.c all(y,  O) && ( a[O] =  y[O])
                                } 
                                return  a
                           } ),
                       n.app ly(this , argum ents)
                   )
              }
         Obj ect.def ineProp erty(e,  "__esM odule",  { valu e: !0 } )
         var  i = Tn. fsSyncM ethods, 
             s  = Tn.f sAsyncM ethods, 
             u  = F.co nstants .F_OK,
              l  = F.con stants. R_OK,
              g =  F.cons tants.W _OK,
              p =  F.const ants.X_ OK
         ;(e .Volume  = se.V olume),  (e.vol  = new  se.Volu me()),  (e.crea teFsFro mVolume  = r),  (e.fs =  r(e.vo l)), (t .export s = n(n ({}, t. exports ), e.fs )), (t. exports .semant ic = !0 )
    } )
    e t(Co)
     var  Bo = Co .create FsFromV olume
     iu.p rototyp e.emit  = funct ion (t)  {
         for  (var e , r, n  = [], i  = 1; i  < argu ments.l ength;  i++) n[ i - 1]  = argum ents[i] 
         i = t his.lis teners( t)
         try  {
              for (v ar s =  Kr(i),  u = s.n ext();  !u.done ; u = s .next() ) {
                  v ar l =  u.value 
                  try  {
                       l.appl y(void  0, ks(n ))
                  }  catch ( g) {
                       con sole.er ror(g)
                   }
              }
         }  catch ( g) {
              e =  { error : g }
          } final ly {
              try  {
                  u & & !u.do ne && ( r = s.r eturn)  && r.ca ll(s)
              } f inally  {
                  if  (e) thr ow e.er ror
              }
         }
          return  0 < i. length
     }
     var  Wu = (f unction  () {
          functio n t() { 
             ; (this.v olume =  new Po ()), (t his.fs  = Bo(th is.volu me)), t his.fro mJSON({  "/dev/ stdin":  "", "/ dev/std out": " ", "/de v/stder r": ""  })
         }
          return  (
              (t.prot otype._ toJSON  = funct ion (e,  r, n)  {
                  r = == void  0 && ( r = {}) 
                  var  i = !0, 
                       s
                  for  (s in  e.child ren) {
                       i  = !1
                       va r u = e .getChi ld(s)
                       if  (u) {
                            var  l = u.g etNode( )
                           l  && l.is File()  ? ((u =  u.getP ath()),  n && ( u = an( n, u)),  (r[u]  = l.get Buffer( ))) : l  && l.i sDirect ory() & & this. _toJSON (u, r,  n)
                       }
                  } 
                  retu rn (e =  e.getP ath()),  n && ( e = an( n, e)),  e && i  && (r[ e] = nu ll), r
              }) ,
              (t.prot otype.t oJSON =  functi on (e,  r, n) { 
                  var  i, s
                   r === v oid 0 & & (r =  {}), n  === voi d 0 &&  (n = !1 )
                  var  u = [] 
                  if ( e) {
                       e i nstance of Arra y || (e  = [e]) 
                       try {
                            for ( var l =  Kr(e),  g = l. next();  !g.don e; g =  l.next( )) {
                                va r p = Y u(g.val ue),
                                     a = t his.vol ume.get Resolve dLink(p )
                                a &&  u.push( a)
                           } 
                       } catch  (\$) {
                            var  y = { e rror: \$  }
                       } fin ally {
                            try  {
                                g &&  !g.done  && (i  = l.ret urn) &&  i.call (l)
                            } final ly {
                                if  (y) th row y.e rror
                            }
                       }
                  }  else u .push(t his.vol ume.roo t)
                  if  (!u.le ngth) r eturn r 
                  try  {
                       for (v ar v =  Kr(u),  w = v.n ext();  !w.done ; w = v .next() ) (a =  w.value ), this ._toJSO N(a, r,  n ? a. getPath () : "" )
                  } c atch (\$ ) {
                       var  O = { e rror: \$  }
                  }  finally  {
                       try { 
                           w & & !w.do ne && ( s = v.r eturn)  && s.ca ll(v)
                       }  finally  {
                           i f (O) t hrow O. error
                       }
                   }
                  r eturn r 
             } ),
              (t.pro totype. fromJSO NFixed  = funct ion (e,  r) {
                   for (v ar n in  r) {
                       va r i = r [n]
                       if ( i ? Obj ect.get Prototy peOf(i)  !== nu ll : i  !== nul l) {
                            var s  = \$u(n) 
                           1 <  s.leng th && ( (s = "/ " + s.s lice(0,  s.leng th - 1) .join(" /")), e .mkdirp Base(s,  511)),  e.writ eFileSy nc(n, i  || "") 
                       } else  e.mkdir pBase(n , 511)
                   }
              }),
              (t. prototy pe.from JSON =  functio n (e) { 
                  ;(th is.volu me = ne w Po()) , this. fromJSO NFixed( this.vo lume, e ), (thi s.fs =  Bo(this .volume )), (th is.volu me.rele asedFds  = [0,  1, 2]),  (e = t his.vol ume.ope nSync(" /dev/st derr",  "w"))
                   var r  = this. volume. openSyn c("/dev /stdout ", "w") ,
                       n = th is.volu me.open Sync("/ dev/std in", "r ")
                  if  (e !==  2) thr ow Erro r("inva lid han dle for  stderr : " + e )
                  if  (r !==  1) thro w Error ("inval id hand le for  stdout:  " + r) 
                  if ( n !== 0 ) throw  Error( "invali d handl e for s tdin: "  + n)
              }), 
             ( t.proto type.ge tStdOut  = func tion ()  {
                  re turn Ts (this,  void 0,  void 0 , funct ion ()  {
                       var e, 
                           r =  this
                       re turn Is (this,  functio n () {
                            retu rn (
                                (e  = new  Promise (functi on (n)  {
                                    n (r.fs.r eadFile Sync("/ dev/std out", " utf8")) 
                                })),
                                [ 2, e]
                            )
                       })
                   })
              }),
              t
          )
    } )()
     class  Gu {
         c onstruc tor(e)  {
              ;(this. self =  e), (th is.wasm Fs = ne w Wu()) , (this .curDir  = "/") 
             c onst r  = this. wasmFs. fs.writ eSync.b ind(thi s.wasmF s.fs)
              ;(t his.was mFs.fs. writeSy nc = (n , i, s,  u, l)  => {
                   switch  (n) {
                       ca se 1:
                       ca se 2:
                            {
                                con st g =  typeof  i == "s tring"  ? i : n ew Text Decoder ("utf-8 ").deco de(i)
                                t his.sel f.postM essage( { actio n: "con soleOut ", text : g, is Error:  n === 2  })
                            }
                           br eak
                  } 
                  retu rn r(n,  i, s,  u, l)
              }), 
                  (thi s.self. onmessa ge = as ync (n)  => {
                       co nst i =  n.data 
                       let s
                       tr y {
                            switch  (i.acti on) {
                                c ase "wr iteFile ":
                                     this.wr iteFile (i.file Path, i .conten t)
                                     break
                                c ase "re adFile" :
                                    s  = this .readFi le(i.fi lePath) 
                                    br eak
                                cas e "unli nk":
                                     this. unlink( i.fileP ath)
                                     break 
                                case " chdir": 
                                    s  = this. chdir(i .filePa th)
                                     break
                                 case "m kdir":
                                     thi s.mkdir (i.file Path, i .option )
                                    b reak
                                ca se "rea ddir":
                                     s =  this.r eaddir( i.fileP ath)
                                     break 
                                case " runWasi ":
                                     s = awa it this .runWas i(i.fil ePath,  i.args) 
                                    br eak
                                def ault:
                                     thro w \`\${i. action} : Not h andled\` 
                           }
                            this. self.po stMessa ge({ me ssageId : i.mes sageId,  result : s })
                       }  catch  (u) {
                            if (u .stack)  {
                                u =  u.stack 
                           } e lse {
                                u  = u.to String( )
                           }
                            this .self.p ostMess age({ m essageI d: i.me ssageId , error : u })
                       } 
                  })
          }
         writ eFile(e , r) {
              th is.wasm Fs.fs.w riteFil eSync(e , r)
              cons ole.deb ug(\`fin ished w riting  \${e}\`)
          }
         rea dFile(e ) {
              const  r = th is.wasm Fs.fs.r eadFile Sync(e) 
             i f (r !=  null)  return  r
              throw \` File no t found : \${e}\` 
         }
         un link(e)  {
              this.w asmFs.f s.unlin kSync(e )
         }
         c hdir(e)  {
              return  this.w asmFs.f s.statS ync(e). isDirec tory()  ? ((thi s.curDi r = e),  !0) :  !1
         }
          mkdir(e , r) {
              th is.wasm Fs.fs.m kdirSyn c(e, r) 
         }
         re addir(e ) {
              retur n this. wasmFs. fs.read dirSync (e)
         }
          async  runWasi (e, r)  {
              const n  = new  Os(this .wasmFs , r, th is.curD ir)
              let i  = 0
              try  {
                  awa it n.ru nWasiEn try(e)
              }  catch ( s) {
                   if (!(s  instan ceof fi )) thro w s
                  i  = s.co de
              }
              return  i
         }
     }
     new G u(self) 
})()
  `)
const relativePathToOriginal = "wasi_worker.js"
try {
    if (relativePathToOriginal && globalThis?.Deno?.readFileSync instanceof Function) {
        const { FileSystem } = await import("https://deno.land/x/quickr@0.6.72/main/file_system.js")
        // equivlent to: import.meta.resolve(relativePathToOriginal)
        // but more bundler-friendly
        const path = `${FileSystem.thisFolder}/${relativePathToOriginal}`
        const current = await Deno.readFile(path)
        output = current
        // update the file whenever (no await)
        const thisFile = FileSystem.thisFile // equivlent to: import.meta.filename, but more bundler-friendly
        setTimeout(async () => {
            try {
                const changeOccured = !(current.length == output.length && current.every((value, index) => value == output[index]))
                // update this file
                if (changeOccured) {
                    output = current
                    const { binaryify } = await import("https://deno.land/x/binaryify@2.5.0.0/binaryify_api.js")
                    await binaryify({
                        pathToBinary: path,
                        pathToBinarified: thisFile,
                    })
                }
            } catch (e) {
            }
        }, 0)
    }
} catch (e) {
    console.error(e)
}
        
export default output