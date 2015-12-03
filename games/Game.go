// automatically generated, do not modify

package games

import (
	flatbuffers "github.com/google/flatbuffers/go"
)
type Game struct {
	_tab flatbuffers.Table
}

func GetRootAsGame(buf []byte, offset flatbuffers.UOffsetT) *Game {
	n := flatbuffers.GetUOffsetT(buf[offset:])
	x := &Game{}
	x.Init(buf, n + offset)
	return x
}

func (rcv *Game) Init(buf []byte, i flatbuffers.UOffsetT) {
	rcv._tab.Bytes = buf
	rcv._tab.Pos = i
}

func (rcv *Game) Id() []byte {
	o := flatbuffers.UOffsetT(rcv._tab.Offset(4))
	if o != 0 {
		return rcv._tab.ByteVector(o + rcv._tab.Pos)
	}
	return nil
}

func (rcv *Game) A(j int) int8 {
	o := flatbuffers.UOffsetT(rcv._tab.Offset(6))
	if o != 0 {
		a := rcv._tab.Vector(o)
		return rcv._tab.GetInt8(a + flatbuffers.UOffsetT(j * 1))
	}
	return 0
}

func (rcv *Game) ALength() int {
	o := flatbuffers.UOffsetT(rcv._tab.Offset(6))
	if o != 0 {
		return rcv._tab.VectorLen(o)
	}
	return 0
}

func (rcv *Game) B(j int) int8 {
	o := flatbuffers.UOffsetT(rcv._tab.Offset(8))
	if o != 0 {
		a := rcv._tab.Vector(o)
		return rcv._tab.GetInt8(a + flatbuffers.UOffsetT(j * 1))
	}
	return 0
}

func (rcv *Game) BLength() int {
	o := flatbuffers.UOffsetT(rcv._tab.Offset(8))
	if o != 0 {
		return rcv._tab.VectorLen(o)
	}
	return 0
}

func (rcv *Game) C(j int) int8 {
	o := flatbuffers.UOffsetT(rcv._tab.Offset(10))
	if o != 0 {
		a := rcv._tab.Vector(o)
		return rcv._tab.GetInt8(a + flatbuffers.UOffsetT(j * 1))
	}
	return 0
}

func (rcv *Game) CLength() int {
	o := flatbuffers.UOffsetT(rcv._tab.Offset(10))
	if o != 0 {
		return rcv._tab.VectorLen(o)
	}
	return 0
}

func (rcv *Game) PlayerO() []byte {
	o := flatbuffers.UOffsetT(rcv._tab.Offset(12))
	if o != 0 {
		return rcv._tab.ByteVector(o + rcv._tab.Pos)
	}
	return nil
}

func (rcv *Game) PlayerX() []byte {
	o := flatbuffers.UOffsetT(rcv._tab.Offset(14))
	if o != 0 {
		return rcv._tab.ByteVector(o + rcv._tab.Pos)
	}
	return nil
}

func GameStart(builder *flatbuffers.Builder) { builder.StartObject(6) }
func GameAddId(builder *flatbuffers.Builder, id flatbuffers.UOffsetT) { builder.PrependUOffsetTSlot(0, flatbuffers.UOffsetT(id), 0) }
func GameAddA(builder *flatbuffers.Builder, a flatbuffers.UOffsetT) { builder.PrependUOffsetTSlot(1, flatbuffers.UOffsetT(a), 0) }
func GameStartAVector(builder *flatbuffers.Builder, numElems int) flatbuffers.UOffsetT { return builder.StartVector(1, numElems, 1)
}
func GameAddB(builder *flatbuffers.Builder, b flatbuffers.UOffsetT) { builder.PrependUOffsetTSlot(2, flatbuffers.UOffsetT(b), 0) }
func GameStartBVector(builder *flatbuffers.Builder, numElems int) flatbuffers.UOffsetT { return builder.StartVector(1, numElems, 1)
}
func GameAddC(builder *flatbuffers.Builder, c flatbuffers.UOffsetT) { builder.PrependUOffsetTSlot(3, flatbuffers.UOffsetT(c), 0) }
func GameStartCVector(builder *flatbuffers.Builder, numElems int) flatbuffers.UOffsetT { return builder.StartVector(1, numElems, 1)
}
func GameAddPlayerO(builder *flatbuffers.Builder, playerO flatbuffers.UOffsetT) { builder.PrependUOffsetTSlot(4, flatbuffers.UOffsetT(playerO), 0) }
func GameAddPlayerX(builder *flatbuffers.Builder, playerX flatbuffers.UOffsetT) { builder.PrependUOffsetTSlot(5, flatbuffers.UOffsetT(playerX), 0) }
func GameEnd(builder *flatbuffers.Builder) flatbuffers.UOffsetT { return builder.EndObject() }
