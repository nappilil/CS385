open Parser_plaf.Ast
open Parser_plaf.Parser
open Ds

(** 
Lilli Nappi and Aditi Deshmukh
I pledge my honor that I have abided by the Stevens Honors System.
 *)

let rec eval_expr : expr -> exp_val ea_result = fun e ->
  match e with
  | Int(n) ->
    return @@ NumVal n
  | Var(id) ->
    apply_env id
  | Add(e1,e2) ->
    eval_expr e1 >>=
    int_of_numVal >>= fun n1 ->
    eval_expr e2 >>=
    int_of_numVal >>= fun n2 ->
    return @@ NumVal (n1+n2)
  | Sub(e1,e2) ->
    eval_expr e1 >>=
    int_of_numVal >>= fun n1 ->
    eval_expr e2 >>=
    int_of_numVal >>= fun n2 ->
    return @@ NumVal (n1-n2)
  | Mul(e1,e2) ->
    eval_expr e1 >>=
    int_of_numVal >>= fun n1 ->
    eval_expr e2 >>=
    int_of_numVal >>= fun n2 ->
    return @@ NumVal (n1*n2)
  | Div(e1,e2) ->
    eval_expr e1 >>=
    int_of_numVal >>= fun n1 ->
    eval_expr e2 >>=
    int_of_numVal >>= fun n2 ->
    if n2==0
    then error "Division by zero"
    else return @@ NumVal (n1/n2)
  | Let(id,def,body) ->
    eval_expr def >>=
    extend_env id >>+
    eval_expr body
  | ITE(e1,e2,e3) ->
    eval_expr e1 >>=
    bool_of_boolVal >>= fun b ->
    if b
    then eval_expr e2
    else eval_expr e3
  | IsZero(e) ->
    eval_expr e >>=
    int_of_numVal >>= fun n ->
    return @@ BoolVal (n = 0)
  | Proc(id,_,e)  ->
    lookup_env >>= fun en ->
    return (ProcVal(id,e,en))
  | App(e1,e2)  -> 
    eval_expr e1 >>= 
    clos_of_procVal >>= fun (id,e,en) ->
    eval_expr e2 >>= fun ev ->
    return en >>+
    extend_env id ev >>+
    eval_expr e
  | Abs(e1)      ->
    eval_expr e1  >>=
    int_of_numVal >>= fun n ->
    return @@ NumVal (abs n)
  | Cons(e1, e2) ->
    eval_expr e1 >>= fun n1 ->
    eval_expr e2 >>= 
    list_of_listVal >>= fun n2 ->
    return (ListVal (n1::n2))
  | Hd(e1) ->
    eval_expr e1 >>= 
    list_of_listVal >>= fun n ->
    if (n==[]) then error "Empty list!" else return (ListVal([List.hd(n)]))
  | Tl(e1) ->
    eval_expr e1 >>= 
    list_of_listVal >>= fun n ->
    if (n==[]) then error "Empty list!" else return (ListVal(List.tl(n)))
  | IsEmpty(e1) -> 
    eval_expr e1 >>=
    list_of_listVal >>= fun n ->
    if (n==[]) then return (BoolVal true) else return (BoolVal false)
  | EmptyList ->
    return (ListVal([]))
  | Tuple(es) ->
    sequence (List.map eval_expr es) >>= fun evs ->
    return (TupleVal evs)
  | Untuple(ids,e1,e2) ->
    eval_expr e1 >>=
    tuple_of_tupleVal >>= fun evs ->
    if List.length ids<>List.length evs
         then error "extend_env_list: Arguments do not match parameters!"
         else extend_env_list ids evs >>+
           eval_expr e2
  | Debug(_e) ->
    string_of_env >>= fun str ->
    print_endline str; 
    error "Debug called"
  | _ -> failwith "Not implemented yet!"

(** [eval_prog e] evaluates program [e] *)
let eval_prog (AProg(_,e)) =
  eval_expr e

(** [interp s] parses [s] and then evaluates it *)
let interp (e:string) : exp_val result =
  let c = e |> parse |> eval_prog
  in run c