use super::content_loader::read_file;
use actix_web::HttpResponse;
use super::content_loader::add_component;

pub async fn items() -> HttpResponse {

    //let mut html_data = read_file("./templates/main.html");    

    //html_data = add_component(String::from("header"), html_data);

    HttpResponse::Ok()
        //.content_type("text/html; charset=utf-8")
        .body("<h1>Items html thru body</h1>")
        //.body(html_data)
}
