mod create;
mod delete;
mod edit;
mod get; // import the get file

use actix_web::web::{get, post, scope, ServiceConfig};

pub fn to_do_views_factory(app: &mut ServiceConfig) {
    app.service(
        scope("v1/item")
            .route("create/{title}", post().to(create::create))
            .route("get", get().to(get::get)) // define view and URL
            .route("edit", post().to(edit::edit))
            .route("delete", post().to(delete::delete)),
    );
}
