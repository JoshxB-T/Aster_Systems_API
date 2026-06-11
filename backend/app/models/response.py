from pydantic import BaseModel
from typing import Generic, TypeVar


T = TypeVar("T")


class APIResponse(BaseModel, Generic[T]):
    code: int
    error: str | None = None
    data: T | None = None
