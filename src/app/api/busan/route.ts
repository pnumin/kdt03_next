import { NextRequest, NextResponse } from "next/server";
import busan from "@/data/r.json";

import fs from 'fs/promises';
import path from 'path';
const getFilePath = () => path.join(process.cwd(), 'src', 'data', 'r.json');

type Busan = {
  "UC_SEQ": number,
  "MAIN_TITLE": string,
  "GUGUN_NM": string
}

async function getData(): Promise<Busan[]> {
  const jsonData = await fs.readFile(getFilePath(), 'utf-8');
  return JSON.parse(jsonData);
}

async function writeData(data: Busan[]) {
  const jsonData = JSON.stringify(data, null, 2);
  await fs.writeFile(getFilePath(), jsonData, 'utf-8');
}


export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams;
  const id = searchParams.get("id");

  if (id) {
    const restaurant = busan.find((r) => r.UC_SEQ === Number(id));
    if (restaurant) {
      return NextResponse.json(restaurant);
    }
    else {
      return NextResponse.json({ message: `${id}에 해당하는 레스토랑이 없습니다.` },
        { status: 404 });
    }
  }
  {
    return (
      NextResponse.json(busan)
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const newData = await request.json();

    // 기존 자료 읽기
    let existingData: Busan[] = [];
    try {
      existingData = await getData();
    } catch (readError) {
      console.log("파일이 없거나 읽을 수 없습니다. 새로 생성합니다.");
      existingData = [];
    }

    // 새로운 자료 추가
    existingData.push(newData);

    // 파일 쓰기 (JSON 포맷팅 포함)
    writeData(existingData)

    return NextResponse.json({ message: "데이터 추가 성공", data: newData },
      { status: 201 });
  } catch (error) {
    console.error("POST 요청 오류:", error);
    return NextResponse.json({ error: "데이터 추가 에러 발생" },
      { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID 파라미터가 필요합니다." }, { status: 400 });
    }
    const numericId = Number(id);
    const data = await getData();
    const updatedData = await request.json();
    const index = data.findIndex((item) => item.UC_SEQ === numericId);

    if (index === -1) {
      return NextResponse.json({ error: "해당 데이터가 없음" }, { status: 404 });
    }

    data[index] = { ...updatedData, UC_SEQ: numericId };
    await writeData(data);

    return NextResponse.json({ message: "데이터수정완료", data: data[index] });
  } catch (error) {
    console.error("PUT 요청 오류:", error);
    return NextResponse.json({ error: "데이터수정오류" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID 파라미터가 필요합니다." }, { status: 400 });
    }

    const numericId = Number(id);
    const data = await getData();
    const updatedData = await request.json();

    const index = data.findIndex((item) => item.UC_SEQ === numericId);
    if (index === -1) {
      return NextResponse.json({ error: "해당 데이터가 없음" }, { status: 404 });
    }

    // 데이터 수정 (기존 데이터 + 수정된 데이터 병합)
    data[index] = { ...data[index], ...updatedData };

    await writeData(data);
    return NextResponse.json({ message: "데이터수정완료", data: data[index] });
  } catch (error) {
    console.error("PUT 요청 오류:", error);
    return NextResponse.json({ error: "데이터수정오류" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID 파라미터가 필요합니다." }, { status: 400 });
    }
    const numericId = Number(id);
    const data = await getData();
    const index = data.findIndex((item) => item.UC_SEQ === numericId);

    if (index === -1) {
      return NextResponse.json({ error: "삭제할 데이터를 찾을 수 없습니다." }, 
                                { status: 404 });
    }

    // splice(인덱스, 개수): 해당 인덱스부터 1개를 잘라냄
    data.splice(index, 1);

    await writeData(data);
    return NextResponse.json({
      message: "데이터 삭제 완료",
      deletedId: numericId
    });
  } catch (error) {
    console.error("DELETE 요청 오류:", error);
    return NextResponse.json({ error: "데이터 삭제 중 서버 오류 발생" }, { status: 500 });
  }
}