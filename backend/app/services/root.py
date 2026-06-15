from models.response import APIResponse

def get_root() -> APIResponse[str]:
    return APIResponse(
        data="OK"
    )
