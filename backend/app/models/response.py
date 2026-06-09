from pydantic import BaseModel
from typing import Generic, TypeVar
from pydantic.generics import GenericModel


T = TypeVar("T")


class APIResponse(GenericModel, Generic[T]):
    code: int
    error: str | None
    data: list[T] | None
